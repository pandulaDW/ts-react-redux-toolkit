import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { Column, TableData } from "../../models/flexTypes";
import styles from "../../styles/flexTable.module.scss";
import { calcHeaderWidth, computedStyles } from "./helpers";
import { setFilterTableCol } from "../../redux/scrape";
import { RootState } from "../../redux/_store";

const createOptions = (data: TableData, col: Column) => {
  return Array.from(new Set(data[col.colName])).map((item) => ({
    label: item,
    value: item,
  }));
};

interface Props {
  data: TableData;
  col: Column;
  selectColumns: string[];
  tableRef: React.RefObject<HTMLDivElement>;
}

const FlexHeaderCell: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const { filterTableCols } = useSelector((state: RootState) => state.scrape);
  const { data, tableRef, selectColumns, col } = props;

  return (
    <div
      className={styles["table__header-selectInput"]}
      style={computedStyles(calcHeaderWidth(tableRef, col.colWidth))}
    >
      {selectColumns.includes(col.colName) && (
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
            onChange={(event) => {
              if (event)
                dispatch(setFilterTableCol({ [col.colName]: event.value }));
            }}
          />
        </div>
      )}
    </div>
  );
};

export default FlexHeaderCell;
