import React from "react";
import { useSelector } from "react-redux";
import { ScrapeDataType } from "../../models/scrapeTypes";
import { RootState } from "../../redux/_store";
import styles from "../../styles/scrape.module.scss";

interface Props {
  data: ScrapeDataType[];
}

const ScrapeFullTable: React.FC<Props> = ({ data }) => {
  const { fieldList } = useSelector((state: RootState) => state.scrape);

  return (
    <div className={styles.tableContainer}>
      <div className={styles.tableContainer__header}>
        <div className={styles["tableContainer__header-cell"]}>
          This is header
        </div>
      </div>
      <div className={styles.tableContainer__body}>
        <div className={styles["tableContainer__body-section"]}>section 1</div>
        <div className={styles["tableContainer__body-section"]}>section 2</div>
        <div className={styles["tableContainer__body-section"]}>section 3</div>
        <div className={styles["tableContainer__body-section"]}>section 4</div>
        <div className={styles["tableContainer__body-section"]}>section 5</div>
      </div>
    </div>
  );
};

export default ScrapeFullTable;
