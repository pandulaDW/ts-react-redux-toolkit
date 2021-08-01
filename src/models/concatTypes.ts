export enum ConcatFileTypes {
  lei = "lei",
  rr = "rr",
  repex = "repex",
}

interface ConcatRecord {
  [key: string]: string;
}

export interface RequestParams {
  fileType: ConcatFileTypes;
  value: string;
}

export interface ResponseBody {
  numRecords: number;
  records: ConcatRecord[];
}

export interface ConcatInitResponse {
  counts: {
    rrFile: number;
    leiFile: number;
    repexFile: number;
  };
  last_modified: {
    leiFile: string;
    repexFile: string;
    rrFile: string;
  };
}

export interface ConcatState {
  fileType: ConcatFileTypes;
  value: string;
  data: ConcatRecord[];
  loading: boolean;
  isInitialState: boolean;
  initData: ConcatInitResponse | null;
}
