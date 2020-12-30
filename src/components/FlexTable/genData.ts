import faker from "faker";

export const genColumns = (): string[] => {
  return [
    "companyName",
    "companySuffix",
    "catchPhraseDescriptor",
    "catchPhraseNoun",
  ];
};

export const genData = (): string[][] => {
  const data: string[][] = new Array(10).fill([]);
  data.forEach((row) => {
    row[0] = faker.company.companyName();
    row[1] = faker.company.companySuffix();
    row[2] = faker.company.catchPhraseDescriptor();
    row[3] = faker.company.catchPhraseNoun();
  });

  return data;
};
