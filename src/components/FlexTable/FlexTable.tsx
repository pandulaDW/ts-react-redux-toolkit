import React from "react";
import { Column, TableData } from "../../models/flexTable";
import styles from "../../styles/flexTable.module.scss";
import { genColumns, genData } from "./genData";

interface Props {
  columns: Column[];
  data: TableData;
}

const FlexTable: React.FC<Props> = () => {
  const columns = genColumns();
  const data = genData();

  console.log(data);

  return (
    <div className={styles.table}>
      <div className={styles.table__header}></div>
      <div className={styles.table__body}>
        <div className={styles["table__body-row"]}>section 2</div>
        <div className={styles["table__body-row"]}>section 3</div>
        <div className={styles["table__body-row"]}>section 4</div>
        <div className={styles["table__body-row"]}>section 5</div>
        <div className={styles["table__body-row"]}>section 5</div>
        <div className={styles["table__body-row"]}>section 5</div>
        <div className={styles["table__body-row"]}>section 5</div>
      </div>
    </div>
  );
};

export default FlexTable;
