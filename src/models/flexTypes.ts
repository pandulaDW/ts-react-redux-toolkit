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

export type SelectEvent = ValueType<
  {
    label: string;
    value: string;
  },
  false
>;

export type HandleSelectFunc = (event: SelectEvent, col: Column) => void;
export type HandleSortFunc = (column: Column, desc: boolean) => void;

export interface SortTableCol {
  column?: Column;
  desc?: boolean;
}

export interface TableProps {
  columns: Column[];
  selectColumns?: string[];
  sortColumns?: string[];
  data: TableData;
  rowNum: number;
  filterTableCols?: FilterTableCols;
  handleSelect?: HandleSelectFunc;
  handleSort?: HandleSortFunc;
}

export interface HeaderProps extends Omit<TableProps, "rowNum"> {
  tableRef: React.RefObject<HTMLDivElement>;
}

export interface HeaderCellProps
  extends Omit<HeaderProps, "columns" | "handleSort"> {
  col: Column;
}
