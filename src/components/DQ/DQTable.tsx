import React from "react";
import { useDispatch, useSelector } from "react-redux";
import FlexTable from "../FlexTable/FlexTable";
import { colNames, DQItem } from "../../models/dqTypes";
import {
  flattenData,
  arrangeData,
  createColumns,
  formatData,
  calculateKFIDCount,
} from "../../helpers/dqUtils";
import { setFilterTableCol } from "../../redux/dq";
import { RootState } from "../../redux/_store";
import styles from "../../styles/dq.module.scss";
import { HandleSelectFunc } from "../../models/flexTypes";
import { filterData, createOptions } from "../FlexTable/FlexUtils";

interface Props {
  data: DQItem[];
}

const DQTable: React.FC<Props> = ({ data }) => {
  const dispatch = useDispatch();
  const { filterTableCols } = useSelector((state: RootState) => state.dq);
  const selectColumns = [
    colNames.ErrorCategory,
    colNames.ErrorDescription,
    colNames.KeyFieldValue,
    colNames.Owner,
  ];

  // flatten data and arrange the data for flex table
  const columns = createColumns();
  const flattenedData = flattenData(data);
  const arrangedData = arrangeData(flattenedData);
  let rowNum = flattenedData.length;

  // mutating the arrangedData object to filter
  if (Object.keys(filterTableCols).length)
    rowNum = filterData(arrangedData, filterTableCols);

  // adding count column
  const counts = calculateKFIDCount(arrangedData);
  arrangedData[colNames.Count] = counts;

  // populate select options
  const options = createOptions(arrangedData, selectColumns);

  const formattedData = formatData(arrangedData);
  const handleSelect: HandleSelectFunc = (event, col) => {
    if (event) dispatch(setFilterTableCol({ [col.colName]: event.value }));
    else dispatch(setFilterTableCol({ [col.colName]: "" }));
  };

  return (
    <div className={styles.tableContainer}>
      <FlexTable
        data={formattedData}
        rowNum={rowNum}
        columns={columns}
        selectColumns={selectColumns}
        options={options}
        handleSelect={handleSelect}
        filterTableCols={filterTableCols}
      />
    </div>
  );
};

export default DQTable;
