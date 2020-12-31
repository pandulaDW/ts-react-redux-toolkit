export interface Column {
  colName: string;
  colWidth: number;
}

export type Cell = string | number | boolean;

export interface TableData {
  [key: string]: Cell[];
}
