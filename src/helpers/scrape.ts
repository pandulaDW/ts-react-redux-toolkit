import { ScrapeDataType } from "../models/scrapeTypes";
import { Column, TableData } from "../models/flexTypes";

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

// export const filterData = (data: TableData, filterTableCol: FilterTableCol) => {
//   const copiedData: TableData = { ...data };
//   const indices: number[] = data[filterTableCol.column]
//     .map((el, idx) => (el === filterTableCol.value ? idx : -1))
//     .filter((el) => el !== -1);

//   Object.keys(copiedData).forEach((key) => {
//     copiedData[key] = copiedData[key].filter((_, idx) => indices.includes(idx));
//   });

//   return copiedData;
// };
