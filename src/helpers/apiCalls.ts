import axios, { AxiosResponse } from "axios";
import { ScrapeDataResponseType } from "../models/scrapeTypes";

const address = process.env.REACT_APP_URL;
const port = process.env.REACT_APP_PORT;
const url =
  process.env.NODE_ENV === "development" ? `${address}:${port}` : address;

export const fetchInitCall = (): Promise<
  AxiosResponse<ScrapeDataResponseType>
> => {
  return axios.get(`${url}/lei/scrape/init-data`);
};

export const uploadScrapeFile = () => {
  return axios.post(`${url}/lei/scrape/upload-file`);
};

export const fetchRequestData = (timestamp: number) => {
  return axios.get(`${url}/lei/scrape/scrape-request?timestamp=${timestamp}`);
};
