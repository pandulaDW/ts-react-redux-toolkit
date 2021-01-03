import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ScrapeDataType } from "../../models/scrapeTypes";
import { RootState } from "../../redux/_store";
import styles from "../../styles/scrape.module.scss";
import FlexTable from "../FlexTable/FlexTable";
import { Column, HandleSelectFunc } from "../../models/flexTypes";
import { setFilterTableCol } from "../../redux/scrape";
import {
  arrangeData,
  createColumns,
  filterData,
} from "../../helpers/scrapeUtils";

interface Props {
  data: ScrapeDataType[];
}

const ScrapeFullTable: React.FC<Props> = ({ data }) => {
  const dispatch = useDispatch();
  const { fieldList, filterTableCols } = useSelector(
    (state: RootState) => state.scrape
  );

  const columns: Column[] = createColumns(fieldList);
  const selectColumns = ["KFID", "RA_ID", "company_name", "company_type"];
  const sortColumns = ["KFID", "RA_ID", "company_name", "company_type"];
  const handleSelect: HandleSelectFunc = (event, col) => {
    if (event) dispatch(setFilterTableCol({ [col.colName]: event.value }));
    else dispatch(setFilterTableCol({ [col.colName]: "" }));
  };

  let arrangedData = arrangeData(data, fieldList);
  let rowNum = data.length;

  // mutating the arrangedData object to filter
  if (Object.keys(filterTableCols).length)
    rowNum = filterData(arrangedData, filterTableCols);

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
      />
    </div>
  );
};

export default ScrapeFullTable;
