import { Column } from "../../models/flexTable";

export const computedStyles = (width: number): { [key: string]: string } => ({
  width: `${width}px`,
});

export const calcHeaderWidth = (
  tableRef: React.RefObject<HTMLDivElement>,
  width: number
): number => {
  if (tableRef.current)
    return tableRef.current.scrollHeight < tableRef.current.clientHeight
      ? width
      : width - 4;
  return width;
};

export const calcTableWidth = (columns: Column[]): number => {
  return columns.reduce((acc, curr) => {
    acc += curr.colWidth;
    return acc;
  }, 0);
};
