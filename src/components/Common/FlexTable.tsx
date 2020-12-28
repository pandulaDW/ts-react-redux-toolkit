import React from "react";
import { v4 as uuid } from "uuid";
import { Column } from "../../models/flexTable";
import styles from "../../styles/flexTable.module.scss";

interface Props {
  columns: Column[];
}

const FlexTable: React.FC<Props> = ({ columns }) => {
  return (
    <div className={styles.table}>
      <div className={styles.table__header}>
        {columns.map((col) => (
          <div
            key={uuid()}
            style={{ width: `${col.colWidth}px` }}
            className={styles["table__header-headerCell"]}
          >
            {col.colName}
          </div>
        ))}
      </div>
      <div className={styles.table__body}>
        <div className={styles["table__body-row"]}>section 1</div>
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
