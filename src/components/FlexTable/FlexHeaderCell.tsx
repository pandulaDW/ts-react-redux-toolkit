import React, { useState } from "react";
import cx from "classnames";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import { calcHeaderWidth, computedStyles } from "./helpers";
import styles from "../../styles/flexTable.module.scss";
import { HeaderCellProps } from "../../models/flexTypes";

const FlexHeaderCell: React.FC<HeaderCellProps> = (props) => {
  const { col, handleSort, tableRef, sortColumns } = props;
  const [order, setOrder] = useState<"asc" | "desc" | "none">("none");

  return (
    <div
      className={styles["table__header-headerCell"]}
      style={computedStyles(calcHeaderWidth(tableRef, col.colWidth))}
    >
      <p>{col.colName}</p>
      {sortColumns && sortColumns.includes(col.colName) && handleSort && (
        <div>
          <FaAngleUp
            className={cx(styles["sort-icon"], {
              [styles.active]: order === "desc",
            })}
            onClick={() => {
              setOrder("desc");
              handleSort({ column: col, desc: true });
            }}
          />
          <FaAngleDown
            className={cx(styles["sort-icon"], {
              [styles.active]: order === "asc",
            })}
            onClick={() => {
              setOrder("asc");
              handleSort({ column: col, desc: false });
            }}
          />
        </div>
      )}
    </div>
  );
};

export default FlexHeaderCell;
