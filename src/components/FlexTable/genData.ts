import faker from "faker";
import { Column } from "../../models/flexTable";

export const genColumns = (): Column[] => {
  const columns = [
    "CompanyName",
    "CompanySuffix",
    "CatchPhrase",
    "CatchPhraseDescriptor",
    "CatchPhraseNoun",
  ];

  return [
    { colName: "Index", colWidth: 100 },
    ...columns.map((col) => {
      return { colName: col, colWidth: 300 };
    }),
  ];
};

const genCompanyData = (): string[] => {
  return [
    faker.company.companyName(),
    faker.company.companySuffix(),
    faker.company.catchPhrase(),
    faker.company.catchPhraseDescriptor(),
    faker.company.catchPhraseNoun(),
  ];
};

export const genData = (rowNum: number): string[][] => {
  const data: string[][] = [];
  let count = 1;
  for (let index = 0; index < rowNum; index++) {
    data.push([count.toString(), ...genCompanyData()]);
    count++;
  }
  return data;
};
