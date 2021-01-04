import React from "react";
import { ValueType } from "react-select";

export interface Column {
  colName: string;
  colWidth: number;
}

export interface FilterTableCols {
  [column: string]: string;
}

export interface SortTableCol {
  column?: Column;
  desc?: boolean;
}

export interface TableData<T> {
  [key: string]: T[];
}

export interface OptionType {
  label: string;
  value: string;
}

export type SelectEvent = ValueType<OptionType, false>;
export interface OptionsArray {
  [col: string]: OptionType[];
}

export type HandleSelectFunc = (event: SelectEvent, col: Column) => void;
export type HandleSortFunc = (sortCol: SortTableCol) => void;

export interface TableProps {
  columns: Column[];
  selectColumns?: string[];
  options?: OptionsArray;
  sortColumns?: string[];
  sortTableCol?: SortTableCol;
  data: TableData<string | React.ReactNode>;
  rowNum: number;
  filterTableCols?: FilterTableCols;
  handleSelect?: HandleSelectFunc;
  handleSort?: HandleSortFunc;
}

export interface HeaderProps extends Omit<TableProps, "rowNum"> {
  tableRef: React.RefObject<HTMLDivElement>;
}

export interface HeaderSelectProps
  extends Omit<HeaderProps, "columns" | "handleSort"> {
  col: Column;
}

export interface HeaderCellProps
  extends Omit<HeaderProps, "columns" | "handleSelect" | "data" | "options"> {
  col: Column;
}
