export const computedStyles = (width: number) => ({
  width: `${width}px`,
});

export const calcHeaderWidth = (
  tableRef: React.RefObject<HTMLDivElement>,
  width: number
) => {
  if (tableRef.current)
    return tableRef.current.scrollHeight < tableRef.current.clientHeight
      ? width
      : width - 4;
  return width;
};
