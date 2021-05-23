import * as XLSX from "xlsx";
import { v4 as uuid } from "uuid";
import { AxiosResponse, AxiosError } from "axios";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";

import { range } from "./utils";
import { fetchSingleRequest } from "./apiCalls";
import {
  ScrapeDataType,
  ExcelDataType,
  ScrapeDataResponse,
  ScrapeRequest,
} from "../models/scrapeTypes";
import { setLoadingProgress } from "../redux/scrape";
import { Column, TableData, OptionsArray } from "../models/flexTypes";
import { matchFunc } from "../components/Scrape/matchFunc";

export const arrangeData = (data: ScrapeDataType[], fieldList: string[]) => {
  let arrangedData: TableData<string> = {
    KFID: data.map((item) => item.kfid),
    RA_ID: data.map((item) => item.RAId),
  };

  fieldList.forEach((field) => {
    arrangedData = {
      ...arrangedData,
      [field]: data.map((item) => item[field]?.uv_value),
      [`scraped ${field}`]: data.map((item) => item[field]?.scraped_value),
    };
  });

  return arrangedData;
};

export const createColumns = (fieldList: string[]): Column[] => [
  { colName: "KFID", colWidth: 120 },
  { colName: "RA_ID", colWidth: 120 },
  ...fieldList.flatMap((field) => {
    return [
      { colName: field, colWidth: 200 },
      { colName: `scraped ${field}`, colWidth: 200 },
    ];
  }),
];

export const createOptions = (data: TableData<string>, cols: string[]) => {
  return cols.reduce<OptionsArray>((acc, curr) => {
    acc[curr] = Array.from(new Set(data[curr])).map((item) => ({
      label: item,
      value: item,
    }));
    return acc;
  }, {});
};

export const formatData = (
  arrangedData: TableData<string | React.ReactNode>,
  cols: string[]
) => {
  for (const col of cols) {
    let elements1: JSX.Element[] = [];
    let elements2: JSX.Element[] = [];

    range(arrangedData[col].length).forEach((index) => {
      const uv_value = arrangedData[col][index] as string;
      const scraped_value = arrangedData[`scraped ${col}`][index] as string;
      elements1.push(matchFunc(uv_value, scraped_value));
      elements2.push(matchFunc(scraped_value, uv_value));
    });

    arrangedData[col] = elements1;
    arrangedData[`scraped ${col}`] = elements2;
  }
};

// Excel reader promise
const readExcel = (file: File): Promise<ExcelDataType> => {
  const promise: Promise<ExcelDataType> = new Promise((resolve, reject) => {
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);

    fileReader.onload = (e) => {
      const bufferArray = e.target!.result;
      const wb = XLSX.read(bufferArray, { type: "buffer" });
      const wsName = wb.SheetNames[0];
      const ws = wb.Sheets[wsName];
      const data = XLSX.utils.sheet_to_json(ws) as ExcelDataType;
      resolve(data);
    };

    fileReader.onerror = (err) => {
      reject(err);
    };
  });

  return promise;
};

// Creating base64 encoded file based on the given row
const createFilteredFile = (row: ExcelDataType) => {
  const wb = XLSX.utils.book_new();
  const ws_name = "Sheet 1";
  const ws = XLSX.utils.json_to_sheet(row);
  XLSX.utils.book_append_sheet(wb, ws, ws_name);

  const wbout = XLSX.write(wb, {
    bookType: "xlsx",
    bookSST: false,
    type: "base64",
  });

  return wbout as string;
};

// PromiseObject interface
interface PromiseObject {
  requestId: string;
  promise: Promise<AxiosResponse<ScrapeDataResponse>>;
}

// Creating promise object list
const createPromiseObjList = (data: ExcelDataType) => {
  const promiseObjects: PromiseObject[] = data.map((row) => {
    const content = createFilteredFile([row]);
    const requestId = uuid();
    const promise = fetchSingleRequest({ requestId, content });
    return { requestId, promise };
  });

  return promiseObjects;
};

// Scrape requests multiplexing
export async function fetchScrapeRequests(
  dispatch: ThunkDispatch<unknown, unknown, AnyAction>,
  file: File
) {
  const data = await readExcel(file);
  const timestamp = Date.now();
  const responseData: ScrapeDataType[] = [];
  const numRequests = data.length;

  let promiseObjList = createPromiseObjList(data);
  let promiseList = promiseObjList.map((obj) => obj.promise);

  while (promiseList.length > 0) {
    let requestId: ScrapeRequest["requestId"];
    try {
      const response = await Promise.race(promiseList);
      requestId = (JSON.parse(response.config.data) as ScrapeRequest).requestId;
      const { data } = response.data;
      responseData.push(data);
    } catch (error) {
      const err = error as AxiosError;
      if (err.response?.status !== 504) {
        requestId = (JSON.parse(err.response?.config.data) as ScrapeRequest)
          .requestId;
      }
    }

    promiseObjList = promiseObjList.filter(
      (obj) => obj.requestId !== requestId
    );
    promiseList = promiseObjList.map((obj) => obj.promise);
    const currentProgress = promiseList.length / numRequests;
    dispatch(setLoadingProgress(Math.round(currentProgress * 100) / 100));
  }

  return { data: responseData, timestamp };
}
