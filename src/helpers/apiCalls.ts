import axios, { AxiosResponse } from "axios";
import {
  ScrapeDataInitResponseType,
  ScrapeDataResponseType,
} from "../models/scrapeTypes";

const address = process.env.REACT_APP_URL;
const port = process.env.REACT_APP_PORT;
const url =
  process.env.NODE_ENV === "development" ? `${address}:${port}` : address;

export const fetchInitCall = (): Promise<
  AxiosResponse<ScrapeDataInitResponseType>
> => {
  return axios.get(`${url}/lei/scrape/init-data`);
};

export const uploadScrapeFile = () => {
  return axios.post(`${url}/lei/scrape/upload-file`);
};

export const fetchSingleRequest = (
  data: any
): Promise<AxiosResponse<ScrapeDataResponseType>> => {
  return axios.post(`${url}/lei/scrape/simulate`, data);
};
