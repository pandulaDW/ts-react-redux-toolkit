import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ScrapeDataType } from "../../models/scrapeTypes";
import { RootState } from "../../redux/_store";
import styles from "../../styles/scrape.module.scss";
import FlexTable from "../FlexTable/FlexTable";
import {
  Column,
  HandleSelectFunc,
  HandleSortFunc,
} from "../../models/flexTypes";
import { setFilterTableCol, setSortState } from "../../redux/scrape";
import {
  arrangeData,
  createColumns,
  filterData,
  sortData,
} from "../../helpers/scrapeUtils";

interface Props {
  data: ScrapeDataType[];
}

const ScrapeFullTable: React.FC<Props> = ({ data }) => {
  const dispatch = useDispatch();
  const { fieldList, filterTableCols, sortTableCol } = useSelector(
    (state: RootState) => state.scrape
  );

  const columns: Column[] = createColumns(fieldList);
  const selectColumns = ["KFID", "RA_ID", "company_name", "company_type"];
  const sortColumns = ["KFID", "RA_ID", "company_name", "company_type"];

  const handleSelect: HandleSelectFunc = (event, col) => {
    if (event) dispatch(setFilterTableCol({ [col.colName]: event.value }));
    else dispatch(setFilterTableCol({ [col.colName]: "" }));
  };

  const handleSort: HandleSortFunc = (sortTableCol) => {
    dispatch(setSortState(sortTableCol));
  };

  let arrangedData = arrangeData(data, fieldList);
  let rowNum = data.length;

  // mutating the arrangedData object to filter
  if (Object.keys(filterTableCols).length)
    rowNum = filterData(arrangedData, filterTableCols);

  // mutating the arrangedData object to sort
  if (sortTableCol.column && sortTableCol.desc)
    sortData(arrangedData, sortTableCol.column, sortTableCol.desc);

  return (
    <div className={styles.tableContainer}>
      <FlexTable
        columns={columns}
        selectColumns={selectColumns}
        sortColumns={sortColumns}
        data={arrangedData}
        rowNum={rowNum}
        filterTableCols={filterTableCols}
        handleSelect={handleSelect}
        handleSort={handleSort}
        sortTableCol={sortTableCol}
      />
    </div>
  );
};

export default ScrapeFullTable;
