import { ValueType } from "react-select";

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

export type SearchEvent = ValueType<
  {
    label: string;
    value: string;
  },
  false
>;

export type HandleSearchFunc = (event: SearchEvent, col: Column) => void;

export interface TableProps {
  columns: Column[];
  selectColumns: string[];
  data: TableData;
  rowNum: number;
  filterTableCols?: FilterTableCols;
  handleSearch?: (event: SearchEvent, col: Column) => void;
}

export interface HeaderProps extends Omit<TableProps, "rowNum"> {
  tableRef: React.RefObject<HTMLDivElement>;
}

export interface HeaderCellProps extends Omit<HeaderProps, "columns"> {
  col: Column;
}
