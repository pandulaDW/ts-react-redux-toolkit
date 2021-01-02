export interface Column {
  colName: string;
  colWidth: number;
}

export type Cell = string;

export interface FilterTableCols {
  [column: string]: string;
}

export interface TableData {
  [key: string]: Cell[];
}

export interface TableProps {
  columns: Column[];
  selectColumns: string[];
  data: TableData;
  rowNum: number;
  filterTableCols?: FilterTableCols;
  handleSearch?: (...args: any[]) => any;
}

export type HeaderProps = Pick<
  TableProps,
  "data" | "columns" | "selectColumns"
>;
