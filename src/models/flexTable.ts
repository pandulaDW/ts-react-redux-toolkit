export interface Column {
  colName: string;
  colWidth: number;
}

type CellData = string | number | boolean;

type RowData = CellData[];

export type TableData = RowData[];
