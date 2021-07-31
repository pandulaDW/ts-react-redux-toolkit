import React from "react";
import { colNames, colorObj, ImpactToColor } from "../models/dqTypes";
import { DQItem } from "../models/dqTypes";
import { Column, TableData } from "../models/flexTypes";

type FlattenData = { [key: string]: string }[];

export const flattenData = (data: DQItem[]) => {
  const flatData: FlattenData = [];

  for (const item of data) {
    const newRowObj = {
      [colNames.Date]: new Date().toDateString(),
      [colNames.ErrorCategory]: item["errorType"],
      [colNames.ErrorImpact]: item["Impact"],
      [colNames.ErrorDescription]: item["error"],
      [colNames.FieldsOrRelatedField]: item["errorColumn"].join(", "),
      [colNames.KeyFieldValue]: "",
      [colNames.Owner]: "",
      [colNames.LEIStatus]: "",
      [colNames.OfficialEntityName]: "",
    };

    const metaData = item.metadata;

    Object.keys(metaData).forEach((kfid) => {
      const newAdditionalRowObj = { ...newRowObj };
      newAdditionalRowObj[colNames.KeyFieldValue] = kfid;
      newAdditionalRowObj[colNames.Owner] = metaData[kfid]["Owner"];
      newAdditionalRowObj[colNames.LEIStatus] = metaData[kfid]["LEIStatus"];
      newAdditionalRowObj[colNames.OfficialEntityName] =
        metaData[kfid]["OfficialEntityName"];

      flatData.push(newAdditionalRowObj);
    });
  }

  return flatData;
};

export const arrangeData = (data: FlattenData) => {
  const tableData: TableData<string> = {};
  Object.values(colNames).forEach((colName) => {
    tableData[colName] = data.map((item) => item[colName]);
  });

  return tableData;
};

export const calculateKFIDCount = (data: TableData<string>) => {
  const kfidCount: { [kfid: string]: number } = {};
  const kfids = data[colNames.KeyFieldValue];

  kfids.forEach((kfid) => {
    kfidCount[kfid] = kfidCount[kfid] ? kfidCount[kfid] + 1 : 1;
  });

  const countArray = kfids.map((kfid) => kfidCount[kfid].toString());
  return countArray;
};

export const createColumns = (): Column[] => {
  const columnList: Column[] = [];
  columnList.push({ colName: colNames.Date, colWidth: 120 });
  columnList.push({ colName: colNames.ErrorCategory, colWidth: 120 });
  columnList.push({ colName: colNames.ErrorImpact, colWidth: 120 });
  columnList.push({ colName: colNames.Owner, colWidth: 80 });
  columnList.push({ colName: colNames.KeyFieldValue, colWidth: 120 });
  columnList.push({ colName: colNames.OfficialEntityName, colWidth: 200 });
  columnList.push({ colName: colNames.LEIStatus, colWidth: 120 });
  columnList.push({ colName: colNames.FieldsOrRelatedField, colWidth: 300 });
  columnList.push({ colName: colNames.ErrorDescription, colWidth: 400 });
  columnList.push({ colName: colNames.Count, colWidth: 80 });
  return columnList;
};

export const formatData = (arrangedData: TableData<string>) => {
  const impactCol = arrangedData[colNames.ErrorImpact];

  const coloredNodes: React.ReactNode[] = impactCol.map((item) => {
    const color = ImpactToColor[item];
    return (
      <span
        style={{
          backgroundColor: `${colorObj[color]}`,
          padding: "5px 20px",
          color: "#fff",
        }}
      >
        {item}
      </span>
    );
  });

  const formattedData: TableData<string | React.ReactNode> = { ...arrangedData };
  formattedData[colNames.ErrorImpact] = coloredNodes;

  return formattedData;
};
