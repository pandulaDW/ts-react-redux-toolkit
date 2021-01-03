import React, { useState, useEffect, useRef } from "react";
import { v4 as uuid } from "uuid";
import { TableProps } from "../../models/flexTypes";
import styles from "../../styles/flexTable.module.scss";
import { calcHeaderWidth, computedStyles, calcTableWidth } from "./helpers";
import { range } from "../../helpers/utils";
import FlexHeader from "./FlexHeader";

const FlexTable: React.FC<TableProps> = (props) => {
  const { columns, data, rowNum, selectColumns, sortColumns } = props;
  const { filterTableCols, handleSelect, handleSort } = props;
  const [, setRefChange] = useState(false);
  const tableRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setRefChange(true);
  }, [tableRef]);

  const tableWidth = calcTableWidth(columns);

  return (
    <div className={styles.table} style={computedStyles(tableWidth)}>
      <FlexHeader
        columns={columns}
        data={data}
        tableRef={tableRef}
        selectColumns={selectColumns}
        sortColumns={sortColumns}
        filterTableCols={filterTableCols}
        handleSelect={handleSelect}
        handleSort={handleSort}
      />
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
