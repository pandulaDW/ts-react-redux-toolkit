import React from "react";
import { useSelector } from "react-redux";
import { ScrapeDataType } from "../../models/scrapeTypes";
import { RootState } from "../../redux/_store";
import styles from "../../styles/scrape.module.scss";
import FlexTable from "../FlexTable/FlexTable";
import { Column, TableData } from "../../models/flexTable";

interface Props {
  data: ScrapeDataType[];
}

const arrangeData = (
  data: ScrapeDataType[],
  fieldList: string[]
): TableData => {
  let arrangedData: TableData = {
    KFID: data.map((item) => item.kfid),
    RA_ID: data.map((item) => item.RAId),
  };

  fieldList.forEach((field) => {
    arrangedData = {
      ...arrangedData,
      [field]: data.map((item) => item[field]?.uv_value),
      [`scraped ${field}`]: data.map((item) => item[field]?.scraped_value),
    };
  });

  return arrangedData;
};

const ScrapeFullTable: React.FC<Props> = ({ data }) => {
  const { fieldList } = useSelector((state: RootState) => state.scrape);

  const columns: Column[] = [
    { colName: "KFID", colWidth: 100 },
    { colName: "RA_ID", colWidth: 100 },
    ...fieldList.flatMap((field) => {
      return [
        { colName: field, colWidth: 200 },
        { colName: `scraped ${field}`, colWidth: 200 },
      ];
    }),
  ];

  const selectColumns = ["KFID", "RA_ID", "company_name"];

  return (
    <div className={styles.tableContainer}>
      <FlexTable
        columns={columns}
        selectColumns={selectColumns}
        data={arrangeData(data, fieldList)}
        rowNum={data.length}
      />
    </div>
  );
};

export default ScrapeFullTable;
