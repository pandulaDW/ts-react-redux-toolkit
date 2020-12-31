import React, { useState, useEffect, useRef } from "react";
import { v4 as uuid } from "uuid";
import { Column, TableData } from "../../models/flexTable";
import styles from "../../styles/flexTable.module.scss";
import { genColumns, genData } from "./genData";
import { calcHeaderWidth, computedStyles, calcTableWidth } from "./helpers";

interface Props {
  columns: Column[];
  data: TableData;
}

const FlexTable: React.FC<Props> = () => {
  const [, setRefChange] = useState(false);
  const columns = genColumns();
  const data = genData(30);
  const tableRef = useRef<HTMLDivElement>(null);
  const tableWidth = calcTableWidth(columns);

  useEffect(() => {
    setRefChange(true);
  }, [tableRef]);

  return (
    <div className={styles.table} style={computedStyles(tableWidth)}>
      <div className={styles.table__header}>
        {columns.map((col) => (
          <div
            className={styles["table__header-headerCell"]}
            key={uuid()}
            style={computedStyles(calcHeaderWidth(tableRef, col.colWidth))}
          >
            {col.colName}
          </div>
        ))}
      </div>
      <div className={styles.table__body} ref={tableRef}>
        {data.map((row) => (
          <div className={styles["table__body-row"]} key={uuid()}>
            {row.map((col, idx) => (
              <div
                key={uuid()}
                className={styles["table__body-row-cell"]}
                style={
                  idx === 0
                    ? computedStyles(calcHeaderWidth(tableRef, 100))
                    : computedStyles(calcHeaderWidth(tableRef, 300))
                }
              >
                {col}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlexTable;
