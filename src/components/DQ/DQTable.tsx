import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import FlexTable from "../FlexTable/FlexTable";
import { DQItem, colNames } from "../../models/dqTypes";
import {
  flattenData,
  arrangeData,
  createColumns,
  formatData,
} from "../../helpers/dqUtils";
import { populateKfids } from "../../redux/dq";

import styles from "../../styles/dq.module.scss";

interface Props {
  data: DQItem[];
}

const DQTable: React.FC<Props> = ({ data }) => {
  const dispatch = useDispatch();

  const columns = createColumns();
  const flattenedData = flattenData(data);
  const arrangedData = arrangeData(flattenedData);
  const formattedData = formatData(arrangedData);

  useEffect(() => {
    const distinctKfids = Array.from(new Set(arrangedData[colNames.KeyFieldValue]));
    dispatch(populateKfids(distinctKfids));
    // eslint-disable-next-line
  }, []);

  return (
    <div className={styles.tableContainer}>
      <FlexTable data={formattedData} rowNum={flattenedData.length} columns={columns} />
    </div>
  );
};

export default DQTable;
