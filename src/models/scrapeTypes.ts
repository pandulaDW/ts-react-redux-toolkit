import { FilterTableCols, SortTableCol } from "./flexTypes";

interface FieldProperties {
  uv_value: string;
  scraped_value: string;
  match: boolean;
}

interface NonCommonFields {
  [key: string]: FieldProperties;
}

interface AddedFields {
  finished: boolean;
  onProgress: boolean;
}

interface CommonFields {
  kfid: string;
  url: string;
  ra_id: string;
  ref_no: string;
}

export type ScrapeDataType = NonCommonFields & CommonFields & AddedFields;

export interface ScrapeRequest {
  requestId: string;
  content: string;
}

export interface ScrapeDataInitResponse {
  data: ScrapeDataType[];
  fieldList: string[];
  timestamp: number;
}

export interface ScrapeDataResponse {
  data: ScrapeDataType[];
}

export type ExcelDataType = Array<{
  [colName: string]: string;
}>;

// state definition --------------
export interface ScrapeState {
  ScrapeData: ScrapeDataType[];
  timestamp: number;
  filteredByView: string[];
  filteredByRA: string[];
  uniqueRAs: string[];
  fieldList: string[];
  expand: boolean;
  dataView: DataView;
  filterState: FilterState;
  filterTableCols: FilterTableCols;
  sortTableCol: SortTableCol;
  loading: boolean;
  loadingProgress: number;
  ErrorMsg: string | null;
}

// UI type defs -----------------
export enum DataView {
  single = "single",
  table = "table",
}

export enum FilterState {
  all = "all",
  progress = "progress",
  finished = "finished",
}
