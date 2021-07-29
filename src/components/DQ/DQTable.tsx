import React from "react";
import FlexTable from "../FlexTable/FlexTable";
import { DQItem } from "../../models/dqTypes";
import { Column, TableData } from "../../models/flexTypes";
import styles from "../../styles/dq.module.scss";

enum colNames {
  "Date" = "Date",
  "ErrorCategory" = "Error Category",
  "ErrorImpact" = "Error Impact",
  "Owner" = "Owner",
  "KeyFieldValue" = "Key Field Value",
  "OfficialEntityName" = "Official Entity Name",
  "LEIStatus" = "LEI Status",
  "FieldsOrRelatedField" = "Fields or Related Field",
  "ErrorDescription" = "Error Description",
}

type FlattenData = { [key: string]: string }[];

const flattenData = (data: DQItem[]) => {
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

const arrangeData = (data: FlattenData) => {
  const tableData: TableData<string> = {};
  Object.values(colNames).forEach((colName) => {
    tableData[colName] = data.map((item) => item[colName]);
  });

  return tableData;
};

interface Props {
  data: DQItem[];
}

const createColumns = (): Column[] => {
  const columnList: Column[] = [];
  columnList.push({ colName: colNames.Date, colWidth: 120 });
  columnList.push({ colName: colNames.ErrorCategory, colWidth: 120 });
  columnList.push({ colName: colNames.ErrorImpact, colWidth: 120 });
  columnList.push({ colName: colNames.Owner, colWidth: 80 });
  columnList.push({ colName: colNames.KeyFieldValue, colWidth: 120 });
  columnList.push({ colName: colNames.OfficialEntityName, colWidth: 200 });
  columnList.push({ colName: colNames.LEIStatus, colWidth: 120 });
  columnList.push({ colName: colNames.FieldsOrRelatedField, colWidth: 200 });
  columnList.push({ colName: colNames.ErrorDescription, colWidth: 200 });
  return columnList;
};

const DQTable: React.FC<Props> = ({ data }) => {
  const flattenedData = flattenData(data);
  const arrangedData = arrangeData(flattenedData);
  const columns = createColumns();

  console.log(arrangedData);
  console.log(columns);

  return (
    <div className={styles.tableContainer}>
      <FlexTable data={arrangedData} rowNum={flattenData.length} columns={columns} />
    </div>
  );
};

export default DQTable;
