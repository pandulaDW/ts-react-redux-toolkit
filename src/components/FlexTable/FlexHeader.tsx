import React from "react";
import { v4 as uuid } from "uuid";
import { HeaderProps } from "../../models/flexTypes";
import styles from "../../styles/flexTable.module.scss";
import FlexHeaderSelect from "./FlexHeaderSelect";
import FlexHeaderCell from "./FlexHeaderCell";

const FlexHeader: React.FC<HeaderProps> = (props) => {
  const { columns, data, tableRef, selectColumns, sortColumns } = props;
  const { filterTableCols, handleSelect, handleSort, sortTableCol } = props;

  return (
    <>
      <div className={styles.table__header}>
        {columns.map((col) => (
          <FlexHeaderCell
            col={col}
            key={uuid()}
            tableRef={tableRef}
            handleSort={handleSort}
            selectColumns={selectColumns}
            sortColumns={sortColumns}
            sortTableCol={sortTableCol}
          />
        ))}
      </div>
      <div className={styles["table__body-row"]}>
        {columns.map((col) => (
          <FlexHeaderSelect
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
