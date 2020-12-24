export type ScrapeDataType = {
  [key: string]: {
    invalid: boolean;
    match: boolean;
    update: boolean;
    uv_value: string;
    scraped_value: string;
  };
} & {
  kfid: string;
  url: string;
  RAId: string;
  company_id: string;
  timestamp: number;
};

export interface ScrapeDataResponseType {
  Items: ScrapeDataType[];
  Count: number;
  ScannedCount: number;
}
