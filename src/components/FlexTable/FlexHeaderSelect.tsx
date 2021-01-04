import React from "react";
import Select from "react-select";
import { Column, TableData } from "../../models/flexTypes";
import {
  HeaderSelectProps,
  SelectEvent,
  HandleSelectFunc,
} from "../../models/flexTypes";
import styles from "../../styles/flexTable.module.scss";
import { calcHeaderWidth, computedStyles } from "./helpers";

const createOptions = (data: TableData, col: Column) => {
  return Array.from(new Set(data[col.colName])).map((item) => ({
    label: item,
    value: item,
  }));
};

const handleSearchWrapper = (col: Column, handleSelect: HandleSelectFunc) => {
  return (event: SelectEvent) => handleSelect(event, col);
};

const FlexHeaderSelect: React.FC<HeaderSelectProps> = (props) => {
  const { data, tableRef, selectColumns, col } = props;
  const { filterTableCols, handleSelect } = props;

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
              options={createOptions(data, col)}
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
              onChange={(event) =>
                handleSearchWrapper(col, handleSelect)(event)
              }
            />
          </div>
        )}
    </div>
  );
};

export default FlexHeaderSelect;
