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
