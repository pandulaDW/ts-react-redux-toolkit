import React from "react";
import { useSelector } from "react-redux";
import { ScrapeDataType } from "../../models/scrapeTypes";
import { RootState } from "../../redux/_store";
import styles from "../../styles/scrape.module.scss";
import FlexTable from "../Common/FlexTable";

interface Props {
  data: ScrapeDataType[];
}

const ScrapeFullTable: React.FC<Props> = ({ data }) => {
  const { fieldList } = useSelector((state: RootState) => state.scrape);

  return (
    <div className={styles.tableContainer}>
      <FlexTable />
    </div>
  );
};

export default ScrapeFullTable;
