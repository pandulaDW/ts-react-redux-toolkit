import { FilterTableCols, SortTableCol } from "./flexTypes";

interface FieldProperties {
  invalid: boolean;
  match: boolean;
  update: boolean;
  uv_value: string;
  scraped_value: string;
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
  RAId: string;
  company_id: string;
  timestamp: number;
}

export type ScrapeDataType = NonCommonFields & CommonFields & AddedFields;

export interface ScrapeDataInitResponseType {
  data: ScrapeDataType;
  fieldList: string[];
}

export interface ScrapeDataResponseType extends ScrapeDataInitResponseType {
  requestId: string;
}

export type ExcelDataType = Array<{
  [colName: string]: string;
}>;

// state definition --------------
export interface ScrapeState {
  ScrapeData: ScrapeDataType[];
  timestamp: ScrapeDataType["timestamp"];
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
