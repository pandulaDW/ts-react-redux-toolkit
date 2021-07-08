import React from "react";
import Select from "react-select";
import { Column } from "../../models/flexTypes";
import { HeaderSelectProps, SelectEvent, HandleSelectFunc } from "../../models/flexTypes";
import styles from "../../styles/flexTable.module.scss";
import { calcHeaderWidth, computedStyles } from "./helpers";

const handleSearchWrapper = (col: Column, handleSelect: HandleSelectFunc) => {
  return (event: SelectEvent) => handleSelect(event, col);
};

const FlexHeaderSelect: React.FC<HeaderSelectProps> = (props) => {
  const { tableRef, col } = props;
  const { filterTableCols, selectColumns, handleSelect, options } = props;

  return (
    <div
      className={styles["table__header-selectInput"]}
      style={computedStyles(calcHeaderWidth(tableRef, col.colWidth))}
    >
      {selectColumns &&
        selectColumns.includes(col.colName) &&
        filterTableCols &&
        handleSelect && (
          <div style={{ width: "90%" }}>
            <Select
              options={options && options[col.colName]}
              value={
                col.colName in filterTableCols
                  ? {
                      label: filterTableCols[col.colName],
                      value: filterTableCols[col.colName],
                    }
                  : null
              }
              isClearable
              isSearchable
              onChange={(event) => handleSearchWrapper(col, handleSelect)(event)}
            />
          </div>
        )}
    </div>
  );
};

export default FlexHeaderSelect;
