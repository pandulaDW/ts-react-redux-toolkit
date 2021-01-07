import { range, promisfiedTimeout } from "./utils";
import { uploadScrapeFile, fetchRequestData } from "./apiCalls";
import { AxiosResponse } from "axios";
import {
  ScrapeDataType,
  UploadFileResponseType,
  ScrapeDataResponseType,
} from "../models/scrapeTypes";
import { Column, TableData, OptionsArray } from "../models/flexTypes";
import { matchFunc } from "../components/Scrape/matchFunc";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { testAction } from "../redux/scrape";

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

interface PollingReturn {
  polling: boolean;
  percCompleted: number;
}

export async function fetchAndPollData(
  dispatch: ThunkDispatch<unknown, unknown, AnyAction>
): Promise<AxiosResponse<ScrapeDataResponseType>> {
  const uploadRes = await uploadScrapeFile();
  const { timestamp, kfids } = uploadRes.data as UploadFileResponseType;

  const fetchData = async (): Promise<PollingReturn> => {
    const fetchRes = await fetchRequestData(timestamp);
    const { Items } = fetchRes.data as ScrapeDataResponseType;
    const returnedKfids = Items.map((el) => el.kfid);
    const percCompleted = returnedKfids.length / kfids.length;
    if (percCompleted === 1) return { polling: false, percCompleted };
    return { polling: true, percCompleted };
  };

  // poll dynamoDb every 5 seconds
  const interval = 5000;
  let polling = false;

  while (!polling) {
    await promisfiedTimeout(interval);
    const { polling: isPolling, percCompleted } = await fetchData();
    polling = isPolling;
    dispatch(testAction(percCompleted));
  }

  return await fetchRequestData(timestamp);
}
