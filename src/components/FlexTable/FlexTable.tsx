import React, { useState, useEffect, useRef } from "react";
import { v4 as uuid } from "uuid";
import { Column, TableData } from "../../models/flexTable";
import styles from "../../styles/flexTable.module.scss";
import { calcHeaderWidth, computedStyles, calcTableWidth } from "./helpers";
import { range } from "../../helpers/utils";
import FlexHeader from "./FlexHeader";

interface Props {
  columns: Column[];
  data: TableData;
  rowNum: number;
}

const FlexTable: React.FC<Props> = ({ columns, data, rowNum }) => {
  const [, setRefChange] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setRefChange(true);
  }, [tableRef]);

  const tableWidth = calcTableWidth(columns);

  return (
    <div className={styles.table} style={computedStyles(tableWidth)}>
      <FlexHeader columns={columns} tableRef={tableRef} />
      <div className={styles.table__body} ref={tableRef}>
        {range(rowNum).map((index) => (
          <div className={styles["table__body-row"]} key={uuid()}>
            {columns.map((col) => (
              <div
                key={uuid()}
                className={styles["table__body-row-cell"]}
                style={computedStyles(calcHeaderWidth(tableRef, col.colWidth))}
              >
                {data[col.colName][index]}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FlexTable;
