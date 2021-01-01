export interface Column {
  colName: string;
  colWidth: number;
}

export type Cell = string;

export interface TableData {
  [key: string]: Cell[];
}
