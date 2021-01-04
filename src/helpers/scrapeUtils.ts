import { setIntersection, sortArrayIndex } from "./utils";
import { ScrapeDataType } from "../models/scrapeTypes";
import {
  Column,
  TableData,
  FilterTableCols,
  OptionsArray,
} from "../models/flexTypes";
import { matchFunc } from "../components/Scrape/matchFunc";

export const arrangeData = (data: ScrapeDataType[], fieldList: string[]) => {
  let arrangedData: TableData<string> = {
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

export const createOptions = (data: TableData<string>, cols: string[]) => {
  return cols.reduce<OptionsArray>((acc, curr) => {
    acc[curr] = Array.from(new Set(data[curr])).map((item) => ({
      label: item,
      value: item,
    }));
    return acc;
  }, {});
};

export const formatData = (
  data: ScrapeDataType[],
  arrangedData: TableData<string | React.ReactNode>,
  cols: string[]
) => {
  for (const col of cols) {
    let elements1: JSX.Element[] = [];
    let elements2: JSX.Element[] = [];

    data.forEach((item) => {
      if (!item[col]) return;
      const { uv_value, scraped_value, match } = item[col];
      elements1.push(matchFunc(uv_value, scraped_value, match));
      elements2.push(matchFunc(scraped_value, uv_value, match));
    });

    arrangedData[col] = elements1;
    arrangedData[`scraped ${col}`] = elements2;
  }
};
