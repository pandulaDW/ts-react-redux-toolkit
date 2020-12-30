import faker from "faker";

export const genColumns = (): string[] => {
  return [
    "companyName",
    "companySuffix",
    "catchPhrase",
    "catchPhraseDescriptor",
    "catchPhraseNoun",
  ];
};

const genCompanyData = () => {
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
  for (let index = 0; index < rowNum; index++) {
    data.push(genCompanyData());
  }
  return data;
};
