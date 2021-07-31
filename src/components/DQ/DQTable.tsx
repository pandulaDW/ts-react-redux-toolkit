import React from "react";
import FlexTable from "../FlexTable/FlexTable";
import { colNames, DQItem } from "../../models/dqTypes";
import {
  flattenData,
  arrangeData,
  createColumns,
  formatData,
  calculateKFIDCount,
} from "../../helpers/dqUtils";
import styles from "../../styles/dq.module.scss";

interface Props {
  data: DQItem[];
}

const DQTable: React.FC<Props> = ({ data }) => {
  const columns = createColumns();
  const flattenedData = flattenData(data);
  const arrangedData = arrangeData(flattenedData);

  const counts = calculateKFIDCount(arrangedData);
  arrangedData[colNames.Count] = counts;

  const formattedData = formatData(arrangedData);

  return (
    <div className={styles.tableContainer}>
      <FlexTable data={formattedData} rowNum={flattenedData.length} columns={columns} />
    </div>
  );
};

export default DQTable;
