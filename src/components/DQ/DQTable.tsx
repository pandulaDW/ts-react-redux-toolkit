import React from "react";
import { DQItem } from "../../models/dqTypes";
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
  "Count" = "Count",
}

const flattenData = (data: DQItem[]) => {
  const flatData = [];

  for (const item of data) {
    const newRowObj = {
      [colNames.Date]: new Date().toDateString(),
      [colNames.ErrorCategory]: item["errorType"],
      [colNames.ErrorImpact]: item["Impact"],
      [colNames.ErrorDescription]: item["error"],
      [colNames.FieldsOrRelatedField]: item["errorColumn"],
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
};

interface Props {
  data: DQItem[];
}

const DQTable: React.FC<Props> = ({ data }) => {
  const flattenedData = flattenData(data);
  console.log(flattenedData);
  return <div className={styles.tableContainer}></div>;
};

export default DQTable;
