import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { ScrapeDataType } from "../../models/scrapeTypes";
import { RootState } from "../../redux/_store";
import styles from "../../styles/scrape.module.scss";
import FlexTable from "../FlexTable/FlexTable";
import { Column, HandleSelectFunc } from "../../models/flexTypes";
import { setFilterTableCol } from "../../redux/scrape";
import { arrangeData, createColumns } from "../../helpers/scrape";

interface Props {
  data: ScrapeDataType[];
}

const ScrapeFullTable: React.FC<Props> = ({ data }) => {
  const dispatch = useDispatch();
  const { fieldList, filterTableCols } = useSelector(
    (state: RootState) => state.scrape
  );

  const columns: Column[] = createColumns(fieldList);
  const selectColumns = ["KFID", "RA_ID", "company_name"];
  const handleSelect: HandleSelectFunc = (event, col) => {
    if (event) dispatch(setFilterTableCol({ [col.colName]: event.value }));
    else dispatch(setFilterTableCol({ [col.colName]: "" }));
  };

  let arrangedData = arrangeData(data, fieldList);
  // arrangedData = filterTableCol.column
  //   ? filterData(arrangedData, filterTableCol)
  //   : arrangedData;

  return (
    <div className={styles.tableContainer}>
      <FlexTable
        columns={columns}
        selectColumns={selectColumns}
        data={arrangedData}
        rowNum={data.length}
        filterTableCols={filterTableCols}
        handleSelect={handleSelect}
      />
    </div>
  );
};

export default ScrapeFullTable;
