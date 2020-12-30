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
  const data = genData(30);

  return (
    <div
      className={styles.table}
      style={{ width: `${columns.length * 300}px` }}
    >
      <div className={styles.table__header}>
        {columns.map((col) => (
          <div className={styles["table__header-headerCell"]}>{col}</div>
        ))}
      </div>
      <div className={styles.table__body}>
        {data.map((row) => (
          <div className={styles["table__body-row"]}>
            {row.map((col) => (
              <div className={styles["table__body-row-cell"]}>{col}</div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlexTable;
