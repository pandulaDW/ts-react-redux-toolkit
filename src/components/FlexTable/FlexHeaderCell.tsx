import React from "react";
import cx from "classnames";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";
import { calcHeaderWidth, computedStyles } from "./helpers";
import styles from "../../styles/flexTable.module.scss";
import { HeaderCellProps } from "../../models/flexTypes";

const FlexHeaderCell: React.FC<HeaderCellProps> = (props) => {
  const { col, handleSort, tableRef, selectColumns, sortTableCol } = props;

  return (
    <div
      className={styles["table__header-headerCell"]}
      style={computedStyles(calcHeaderWidth(tableRef, col.colWidth))}
    >
      <p>{col.colName}</p>
      {selectColumns && selectColumns.includes(col.colName) && handleSort && (
        <div>
          <FaAngleUp
            className={cx(styles["sort-icon"], {
              [styles.active]:
                sortTableCol?.column?.colName === col.colName &&
                sortTableCol?.desc === true,
            })}
            onClick={() => handleSort({ column: col, desc: true })}
          />
          <FaAngleDown
            className={cx(styles["sort-icon"], {
              [styles.active]:
                sortTableCol?.column?.colName === col.colName &&
                sortTableCol?.desc === false,
            })}
            onClick={() => handleSort({ column: col, desc: false })}
          />
        </div>
      )}
    </div>
  );
};

export default FlexHeaderCell;
