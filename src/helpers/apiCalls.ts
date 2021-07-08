import axios, { AxiosResponse } from "axios";
import {
  ScrapeDataInitResponse,
  ScrapeDataResponse,
  ScrapeRequest,
  ValidationRequest,
  ValidationResponse,
} from "../models/scrapeTypes";

const address = process.env.REACT_APP_URL;

export const checkScrapeValidation = (
  data: ValidationRequest
): Promise<AxiosResponse<ValidationResponse>> => {
  return axios.post(`${address}/lei/scrape/validation`, data);
};

export const fetchScrapeInitData = (): Promise<
  AxiosResponse<ScrapeDataInitResponse>
> => {
  return axios.get(`${address}/lei/scrape/init`);
};

export const postScrapeRequest = (
  data: ScrapeRequest
): Promise<AxiosResponse<ScrapeDataResponse>> => {
  return axios.post(`${address}/lei/scrape`, data);
};

export const fetchScrapeRequestData = (
  timestamp: number
): Promise<AxiosResponse<ScrapeDataResponse>> => {
  return axios.get(`${address}/lei/scrape?timestamp=${timestamp}`);
};
