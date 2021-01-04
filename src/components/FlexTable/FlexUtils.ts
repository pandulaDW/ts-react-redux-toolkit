import { setIntersection, sortArrayIndex } from "../../helpers/utils";
import { Column, TableData, FilterTableCols } from "../../models/flexTypes";

export const filterData = (
  data: TableData<string>,
  filterCols: FilterTableCols
): number => {
  const indexSetArray: Set<number>[] = [];

  Object.keys(filterCols).forEach((column) => {
    const indices: number[] = data[column]
      .map((el, idx) => (el === filterCols[column] ? idx : -1))
      .filter((el) => el !== -1);

    indexSetArray.push(new Set(indices));
  });

  const filteredIndices: number[] = setIntersection(...indexSetArray);

  Object.keys(data).forEach((key) => {
    data[key] = data[key].filter((_, idx) => filteredIndices.includes(idx));
  });

  return filteredIndices.length;
};

export const sortData = (
  data: TableData<string>,
  col: Column,
  desc: boolean
) => {
  const sortedIndices = sortArrayIndex(data[col.colName], desc);

  Object.keys(data).forEach((key) => {
    const sortedArray = [];
    for (let index = 0; index < sortedIndices.length; index++) {
      sortedArray.push(data[key][sortedIndices[index]]);
    }
    data[key] = sortedArray;
  });
};
