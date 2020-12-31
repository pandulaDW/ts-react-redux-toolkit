import faker from "faker";
import { Column, Cell, TableData } from "../../models/flexTable";
import { range } from "../../helpers/utils";

export class FakeData {
  private columns = [
    "CompanyName",
    "CompanySuffix",
    "CatchPhrase",
    "CatchPhraseDescriptor",
    "CatchPhraseNoun",
    "TestColumn",
  ];
  rowNum: number;

  constructor(rowNum: number) {
    this.rowNum = rowNum;
  }

  genColumns(): Column[] {
    return [
      { colName: "Index", colWidth: 80 },
      ...this.columns.map((col) => {
        return { colName: col, colWidth: 280 };
      }),
    ];
  }

  private genCompanyData(): Cell[][] {
    return [
      new Array(this.rowNum).fill("").map((el) => faker.company.companyName()),
      new Array(this.rowNum)
        .fill("")
        .map((el) => faker.company.companySuffix()),
      new Array(this.rowNum).fill("").map((el) => faker.company.catchPhrase()),
      new Array(this.rowNum)
        .fill("")
        .map((el) => faker.company.catchPhraseDescriptor()),
      new Array(this.rowNum)
        .fill("")
        .map((el) => faker.company.catchPhraseNoun()),
    ];
  }

  genData(): TableData {
    const indices: TableData = { Index: range(this.rowNum + 1, 1) };
    const allData = this.genCompanyData();
    let data: TableData = { ...indices };

    this.columns.forEach((col, idx) => {
      data = { ...data, [col]: allData[idx] };
    });

    return data;
  }
}
