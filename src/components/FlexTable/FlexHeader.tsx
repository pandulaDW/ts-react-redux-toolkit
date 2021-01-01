import React from "react";
import { SelectMenu, Button } from "evergreen-ui";
import { v4 as uuid } from "uuid";
import { Column, TableData } from "../../models/flexTable";
import { calcHeaderWidth, computedStyles } from "./helpers";
import styles from "../../styles/flexTable.module.scss";

interface Props {
  columns: Column[];
  data: TableData;
  selectColumns: string[];
  tableRef: React.RefObject<HTMLDivElement>;
}

const createOptions = (data: TableData, col: Column) => {
  return Array.from(new Set(data[col.colName])).map((label) => ({
    label,
    value: label,
  }));
};

const FlexHeader: React.FC<Props> = (props) => {
  const { columns, data, tableRef, selectColumns } = props;
  return (
    <>
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
      <div className={styles["table__body-row"]}>
        {columns.map((col) => (
          <div
            className={styles["table__header-selectInput"]}
            key={uuid()}
            style={computedStyles(calcHeaderWidth(tableRef, col.colWidth))}
          >
            {selectColumns.includes(col.colName) && (
              <SelectMenu
                title={`Select ${col.colName}`}
                options={createOptions(data, col)}
              >
                <Button>Select ...</Button>
              </SelectMenu>
            )}
          </div>
        ))}
      </div>
    </>
  );
};

export default FlexHeader;
