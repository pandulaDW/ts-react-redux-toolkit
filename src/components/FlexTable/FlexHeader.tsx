import React from "react";
import { v4 as uuid } from "uuid";
import { Column } from "../../models/flexTable";
import { calcHeaderWidth, computedStyles } from "./helpers";
import styles from "../../styles/flexTable.module.scss";

interface Props {
  columns: Column[];
  tableRef: React.RefObject<HTMLDivElement>;
}

const FlexHeader: React.FC<Props> = ({ columns, tableRef }) => {
  return (
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
  );
};

export default FlexHeader;
