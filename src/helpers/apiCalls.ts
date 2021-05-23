import axios, { AxiosResponse } from "axios";
import {
  ScrapeDataInitResponse,
  ScrapeDataResponse,
  ScrapeRequest,
} from "../models/scrapeTypes";

const address = process.env.REACT_APP_URL;
const port = process.env.REACT_APP_PORT;
const url =
  process.env.NODE_ENV === "development" ? `${address}:${port}` : address;

export const fetchInitCall = (): Promise<
  AxiosResponse<ScrapeDataInitResponse>
> => {
  return axios.get(`${url}/lei/scrape/init-data`);
};

export const fetchSingleRequest = (
  data: ScrapeRequest
): Promise<AxiosResponse<ScrapeDataResponse>> => {
  return axios.post(`${url}/lei/scrape/upload-file`, data);
};
