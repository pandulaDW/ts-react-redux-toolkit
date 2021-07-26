export enum ConcatFileTypes {
  lei = "lei",
  rr = "rr",
  repex = "repex",
}

interface ConcatRecord {
  [key: string]: string;
}

export interface RequestBody {
  numRecords: number;
  records: ConcatRecord[];
}

export interface ConcatState {
  fileType: ConcatFileTypes;
}
