import { setIntersection } from "./utils";
import { ScrapeDataType } from "../models/scrapeTypes";
import { Column, TableData, FilterTableCols } from "../models/flexTypes";

export const arrangeData = (data: ScrapeDataType[], fieldList: string[]) => {
  let arrangedData: TableData = {
    KFID: data.map((item) => item.kfid),
    RA_ID: data.map((item) => item.RAId),
  };

  fieldList.forEach((field) => {
    arrangedData = {
      ...arrangedData,
      [field]: data.map((item) => item[field]?.uv_value),
      [`scraped ${field}`]: data.map((item) => item[field]?.scraped_value),
    };
  });

  return arrangedData;
};

export const createColumns = (fieldList: string[]): Column[] => [
  { colName: "KFID", colWidth: 120 },
  { colName: "RA_ID", colWidth: 120 },
  ...fieldList.flatMap((field) => {
    return [
      { colName: field, colWidth: 200 },
      { colName: `scraped ${field}`, colWidth: 200 },
    ];
  }),
];

export const filterData = (data: TableData, filterCols: FilterTableCols): number => {
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
