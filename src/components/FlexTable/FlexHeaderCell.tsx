import React from "react";
import Select from "react-select";
import { Column, TableData } from "../../models/flexTypes";
import {
  HeaderCellProps,
  SearchEvent,
  HandleSearchFunc,
} from "../../models/flexTypes";
import styles from "../../styles/flexTable.module.scss";
import { calcHeaderWidth, computedStyles } from "./helpers";

const createOptions = (data: TableData, col: Column) => {
  return Array.from(new Set(data[col.colName])).map((item) => ({
    label: item,
    value: item,
  }));
};

const handleSearchWrapper = (col: Column, handleSearch: HandleSearchFunc) => {
  return (event: SearchEvent) => handleSearch(event, col);
};

const FlexHeaderCell: React.FC<HeaderCellProps> = (props) => {
  const { data, tableRef, selectColumns, col } = props;
  const { filterTableCols, handleSearch } = props;

  console.log(filterTableCols && handleSearch);

  return (
    <div
      className={styles["table__header-selectInput"]}
      style={computedStyles(calcHeaderWidth(tableRef, col.colWidth))}
    >
      {selectColumns.includes(col.colName) && filterTableCols && handleSearch && (
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
            onChange={(event) => handleSearchWrapper(col, handleSearch)(event)}
          />
        </div>
      )}
    </div>
  );
};

export default FlexHeaderCell;
