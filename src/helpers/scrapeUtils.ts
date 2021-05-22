import * as XLSX from "xlsx";
import { v4 as uuid } from "uuid";
import { AxiosResponse } from "axios";
import { range } from "./utils";
import { fetchSingleRequest } from "./apiCalls";
import {
  ScrapeDataType,
  ExcelDataType,
  ScrapeDataResponseType,
} from "../models/scrapeTypes";
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

// Creating encoded file based on rows
const createFilteredFile = (row: ExcelDataType | any) => {
  const wb = XLSX.utils.book_new();
  const ws_name = "Sheet 1";
  const ws = XLSX.utils.json_to_sheet(row);
  XLSX.utils.book_append_sheet(wb, ws, ws_name);

  const wbout = XLSX.write(wb, {
    bookType: "xlsx",
    bookSST: false,
    type: "base64",
  });

  return wbout;
};

// PromiseObject interface
interface PromiseObject {
  requestId: string;
  promise: Promise<AxiosResponse<ScrapeDataResponseType>>;
}

// Creating promise object list
const createPromiseObjList = (data: ExcelDataType) => {
  const promiseObjects: PromiseObject[] = data.map((row) => {
    const rowFile = createFilteredFile(row);
    const promise = fetchSingleRequest(rowFile);
    return { requestId: uuid(), promise };
  });

  return promiseObjects;
};

// Scrape requests multiplexing
export async function sendScrapeRequests(file: File) {
  const data = await readExcel(file);
  const promiseObjList = createPromiseObjList(data);
  const promiseList = promiseObjList.map((obj) => obj.promise);

  while (promiseList.length > 0) {
    const response = await Promise.race(promiseList);
  }
  await fetchSingleRequest(data);
}
