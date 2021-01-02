import React from "react";
import { useSelector } from "react-redux";
import { ScrapeDataType } from "../../models/scrapeTypes";
import { RootState } from "../../redux/_store";
import styles from "../../styles/scrape.module.scss";
import FlexTable from "../FlexTable/FlexTable";
import { Column } from "../../models/flexTypes";
import { arrangeData, createColumns } from "../../helpers/scrape";

interface Props {
  data: ScrapeDataType[];
}

const ScrapeFullTable: React.FC<Props> = ({ data }) => {
  const { fieldList } = useSelector((state: RootState) => state.scrape);

  const columns: Column[] = createColumns(fieldList);
  const selectColumns = ["KFID", "RA_ID", "company_name"];

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
      />
    </div>
  );
};

export default ScrapeFullTable;
