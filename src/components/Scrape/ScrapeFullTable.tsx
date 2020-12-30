import React from "react";
import { useSelector } from "react-redux";
import { ScrapeDataType } from "../../models/scrapeTypes";
import { RootState } from "../../redux/_store";
import styles from "../../styles/scrape.module.scss";
import FlexTable from "../FlexTable/FlexTable";
import { Column, TableData } from "../../models/flexTable";

interface Props {
  data: ScrapeDataType[];
}

const ScrapeFullTable: React.FC<Props> = ({ data }) => {
  const { fieldList } = useSelector((state: RootState) => state.scrape);
  const colWidth = 350;
  let columns: Column[] = [
    { colName: "KFID", colWidth: 100 },
    { colName: "RA_ID", colWidth: 100 },
    ...fieldList.map((el) => ({
      colName: el,
      colWidth,
    })),
    ...fieldList.map((el) => ({
      colName: `scraped ${el}`,
      colWidth,
    })),
  ];

  const assembledData: TableData = data.map((item) => {
    const row = [
      item.kfid,
      item.RAId,
      ...fieldList.map((field) => (item[field] ? item[field].uv_value : "")),
      ...fieldList.map((field) =>
        item[field] ? item[field].scraped_value : ""
      ),
    ];

    return row;
  });

  return (
    <div className={styles.tableContainer}>
      <FlexTable columns={columns} data={assembledData} />
    </div>
  );
};

export default ScrapeFullTable;
