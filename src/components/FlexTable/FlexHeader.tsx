import React from "react";
import { v4 as uuid } from "uuid";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import { HeaderProps } from "../../models/flexTypes";
import { calcHeaderWidth, computedStyles } from "./helpers";
import styles from "../../styles/flexTable.module.scss";
import FlexHeaderCell from "./FlexHeaderCell";

const FlexHeader: React.FC<HeaderProps> = (props) => {
  const { columns, data, tableRef, selectColumns, sortColumns } = props;
  const { filterTableCols, handleSelect } = props;

  return (
    <>
      <div className={styles.table__header}>
        {columns.map((col) => (
          <div
            className={styles["table__header-headerCell"]}
            key={uuid()}
            style={computedStyles(calcHeaderWidth(tableRef, col.colWidth))}
          >
            <p>{col.colName}</p>
            {sortColumns && sortColumns.includes(col.colName) && (
              <div>
                <FaAngleUp />
                <FaAngleDown />
              </div>
            )}
          </div>
        ))}
      </div>
      <div className={styles["table__body-row"]}>
        {columns.map((col) => (
          <FlexHeaderCell
            key={uuid()}
            data={data}
            tableRef={tableRef}
            selectColumns={selectColumns}
            filterTableCols={filterTableCols}
            handleSelect={handleSelect}
            col={col}
          />
        ))}
      </div>
    </>
  );
};

export default FlexHeader;
