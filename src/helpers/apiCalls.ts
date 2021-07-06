import axios, { AxiosResponse } from "axios";
import {
  ScrapeDataInitResponse,
  ScrapeDataResponse,
  ScrapeRequest,
} from "../models/scrapeTypes";

const address = process.env.REACT_APP_URL;

export const fetchInitCall = (): Promise<
  AxiosResponse<ScrapeDataInitResponse>
> => {
  return axios.get(`${address}/lei/scrape/init`);
};

export const fetchSingleRequest = (
  data: ScrapeRequest
): Promise<AxiosResponse<ScrapeDataResponse>> => {
  return axios.post(`${address}/lei/scrape`, data);
};
