import React from "react";
import { setFileDetails } from "../redux/scrape";
import { range, fileToBase64, promisifiedTimeout } from "./utils";
import {
  checkScrapeValidation,
  fetchScrapeRequestData,
  postScrapeRequest,
} from "./apiCalls";
import { ScrapeDataType } from "../models/scrapeTypes";
import { Column, TableData } from "../models/flexTypes";
import { matchFunc } from "../components/Scrape/matchFunc";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { AxiosError } from "axios";
import { APIErrorResponse } from "../models/generalTypes";

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

export async function fetchScrapeRequests(
  file: File,
  timestamp: number,
  dispatch: ThunkDispatch<unknown, unknown, AnyAction>
) {
  try {
    const fileString = await fileToBase64(file);
    const validationResponse = await validateScrapeData(fileString);
    dispatch(setFileDetails(validationResponse));
    const response = await postScrapeRequest({
      uploaded_file: fileString,
      timestamp,
    });
    return { data: response.data.data };
  } catch (err) {
    const error = err as AxiosError<APIErrorResponse>;
    // if the error is a timeout generated from the API gateway
    if (!error.response) {
      await promisifiedTimeout(3000);
      const response = await fetchScrapeRequestData(timestamp);
      return { data: response.data.data };
    }
    throw err;
  }
}

export async function validateScrapeData(fileString: string) {
  try {
    const response = await checkScrapeValidation({ uploaded_file: fileString });
    return response.data;
  } catch (err) {
    throw err;
  }
}
