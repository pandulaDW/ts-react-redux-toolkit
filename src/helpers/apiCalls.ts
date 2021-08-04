import axios, { AxiosResponse } from "axios";
import {
  ScrapeDataInitResponse,
  ScrapeDataResponse,
  ScrapeRequest,
  ValidationRequest,
  ValidationResponse,
} from "../models/scrapeTypes";
import { DQRequestBody, DQResponseBody, DQExcelResponse } from "../models/dqTypes";
import { RequestParams, ResponseBody, ConcatInitResponse } from "../models/concatTypes";
import { getToken } from "../components/Auth/auth";

const address = process.env.REACT_APP_URL;

// adding authorization token to every request
axios.interceptors.request.use((config) => {
  const { idToken } = getToken();
  if (process.env.NODE_ENV === "production") {
    config.headers.Authorization = idToken;
  }
  return config;
});

export const checkScrapeValidation = (
  data: ValidationRequest
): Promise<AxiosResponse<ValidationResponse>> => {
  return axios.post(`${address}/lei/scrape/validation`, data);
};

export const fetchScrapeInitData = (): Promise<AxiosResponse<ScrapeDataInitResponse>> => {
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

export const fetchDQData = (
  data: DQRequestBody
): Promise<AxiosResponse<DQResponseBody>> => {
  return axios.post(`${address}/lei/dq`, data);
};

export const downloadDQExcel = (
  timestamp: number
): Promise<AxiosResponse<DQExcelResponse>> => {
  return axios.get(`${address}/lei/dq/excel?timestamp=${timestamp}`);
};

export const fetchConcatData = (
  queryParams: RequestParams
): Promise<AxiosResponse<ResponseBody>> => {
  return axios.get(
    `${address}/lei/concat?fileType=${queryParams.fileType}&value=${queryParams.value}`
  );
};

export const fetchConcatInitData = (): Promise<AxiosResponse<ConcatInitResponse>> => {
  return axios.get(`${address}/lei/concat/init`);
};
