import React from "react";
import { useSelector } from "react-redux";
import { ScrapeDataType } from "../../models/scrapeTypes";
import { RootState } from "../../redux/_store";
import styles from "../../styles/scrape.module.scss";
import FlexTable from "../Common/FlexTable";
import { Column } from "../../models/flexTable";

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

  return (
    <div className={styles.tableContainer}>
      <FlexTable columns={columns} />
    </div>
  );
};

export default ScrapeFullTable;
