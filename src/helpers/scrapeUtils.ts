import React from "react";
import { setFileDetails } from "../redux/scrape";
import { range, fileToBase64 } from "./utils";
import { checkScrapeValidation, postScrapeRequest } from "./apiCalls";
import { ScrapeDataType } from "../models/scrapeTypes";
import { Column, OptionsArray, TableData } from "../models/flexTypes";
import { matchFunc } from "../components/Scrape/matchFunc";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";

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
