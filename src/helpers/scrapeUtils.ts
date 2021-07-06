import React from "react";
import * as XLSX from "xlsx";
import { v4 as uuid } from "uuid";
import { AxiosError, AxiosResponse } from "axios";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";

import { range, createIndexChunks } from "./utils";
import { fetchSingleRequest } from "./apiCalls";
import {
  ExcelDataType,
  ScrapeDataResponse,
  ScrapeDataType,
  ScrapeRequest,
} from "../models/scrapeTypes";
import { setLoadingProgress } from "../redux/scrape";
import { Column, OptionsArray, TableData } from "../models/flexTypes";
import { matchFunc } from "../components/Scrape/matchFunc";

export const arrangeData = (data: ScrapeDataType[], fieldList: string[]) => {
  let arrangedData: TableData<string> = {
    kfid: data.map((item) => item.kfid),
    ra_id: data.map((item) => item.ra_id),
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
  { colName: "kfid", colWidth: 120 },
  { colName: "ra_id", colWidth: 120 },
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
  return new Promise((resolve, reject) => {
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
};

// Creating base64 encoded file based on the given row
const createFilteredFile = (row: ExcelDataType) => {
  const wb = XLSX.utils.book_new();
  const ws_name = "Sheet 1";
  const ws = XLSX.utils.json_to_sheet(row);
  XLSX.utils.book_append_sheet(wb, ws, ws_name);

  const wbOut = XLSX.write(wb, {
    bookType: "xlsx",
    bookSST: false,
    type: "base64",
  });

  return wbOut as string;
};

// Take the excel data and create an array of data chunks
const createDataChunks = (data: ExcelDataType, chunkSize: number) => {
  const indicesList = createIndexChunks(data.length, chunkSize);
  const chunkList: Array<ExcelDataType> = [];

  indicesList.forEach((indexSet) => {
    const chunk = indexSet.map((idx) => data[idx]);
    chunkList.push(chunk);
  });

  return chunkList;
};

// PromiseObject interface
interface PromiseObject {
  requestId: string;
  promise: Promise<AxiosResponse<ScrapeDataResponse>>;
}

// Creating promise object list
const createPromiseObjList = (data: ExcelDataType, timestamp: number) => {
  const chunkList = createDataChunks(data, 15);
  const promiseObjects: PromiseObject[] = chunkList.map((chunk) => {
    const content = createFilteredFile(chunk);
    const requestId = uuid();
    const promise = fetchSingleRequest({ requestId, content, timestamp });
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
  let responseData: ScrapeDataType[] = [];
  let completedNumRequests = 0;

  let promiseObjList = createPromiseObjList(data, timestamp);
  let promiseList = promiseObjList.map((obj) => obj.promise);

  while (promiseList.length > 0) {
    let requestId: ScrapeRequest["requestId"];
    try {
      const response = await Promise.race(promiseList);
      requestId = (JSON.parse(response.config.data) as ScrapeRequest).requestId;
      const { data } = response.data;
      completedNumRequests += data.length;
      responseData = [...responseData, ...data];
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
    const currentProgress = completedNumRequests / data.length;
    dispatch(setLoadingProgress(Math.round(currentProgress * 100) / 100));
  }

  return { data: responseData, timestamp };
}
