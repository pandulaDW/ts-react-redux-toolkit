interface NonCommonFields {
  [key: string]: {
    invalid: boolean;
    match: boolean;
    update: boolean;
    uv_value: string;
    scraped_value: string;
  };
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

export interface ScrapeDataResponseType {
  Items: ScrapeDataType[];
  Count: number;
  ScannedCount: number;
  fieldList: string[];
}

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
  loading: boolean;
  ErrorMsg: string | null;
}

// UI type defs -----------------
type DataView = "single" | "table";

export enum FilterState {
  all = "all",
  progress = "progress",
  finished = "finished",
}
