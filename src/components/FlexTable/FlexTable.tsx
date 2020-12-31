import React, { useState, useEffect, useRef } from "react";
import { v4 as uuid } from "uuid";
// import { Column, TableData } from "../../models/flexTable";
import styles from "../../styles/flexTable.module.scss";
import { FakeData } from "./genData";
import { calcHeaderWidth, computedStyles, calcTableWidth } from "./helpers";
import { range } from "../../helpers/utils";

// interface Props {
//   columns: Column[];
//   data: TableData;
// }

const FlexTable = () => {
  const [, setRefChange] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setRefChange(true);
  }, [tableRef]);

  const fakeData = new FakeData(30);
  const columns = fakeData.genColumns();
  const data = fakeData.genData();
  const tableWidth = calcTableWidth(columns);

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
        {range(fakeData.rowNum).map((index) => (
          <div className={styles["table__body-row"]} key={uuid()}>
            {columns.map((col) => (
              <div
                key={uuid()}
                className={styles["table__body-row-cell"]}
                style={computedStyles(calcHeaderWidth(tableRef, col.colWidth))}
              >
                {data[col.colName] ? data[col.colName][index] : ""}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlexTable;
