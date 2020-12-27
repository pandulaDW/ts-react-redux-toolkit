import React from "react";
import { useSelector } from "react-redux";
import { Table } from "evergreen-ui";
import { ScrapeDataType } from "../../models/scrapeTypes";
import { RootState } from "../../redux/_store";
import styles from "../../styles/scrape.module.scss";

interface Props {
  data: ScrapeDataType[];
}

const ScrapeFullTable: React.FC<Props> = ({ data }) => {
  const { fieldList } = useSelector((state: RootState) => state.scrape);

  return (
    <div className={styles.tableContainer}>
      <Table>
        <Table.Head>
          <Table.TextHeaderCell>KFID</Table.TextHeaderCell>
          <Table.TextHeaderCell>RA ID</Table.TextHeaderCell>
          {fieldList.map((field, id) => (
            <>
              <Table.TextHeaderCell>{`${field}`}</Table.TextHeaderCell>
              <Table.TextHeaderCell>{`scraped ${field}`}</Table.TextHeaderCell>
            </>
          ))}
        </Table.Head>
        <Table.Body>
          {data.map((item) => (
            <Table.Row key={item.kfid}>
              <Table.TextCell>{item.kfid}</Table.TextCell>
              <Table.TextCell>{item.RAId}</Table.TextCell>
              {fieldList.map((field) =>
                field in item ? (
                  <>
                    <Table.TextCell>{item[field].uv_value}</Table.TextCell>
                    <Table.TextCell>{item[field].scraped_value}</Table.TextCell>
                  </>
                ) : (
                  <>
                    <Table.TextCell />
                    <Table.TextCell />
                  </>
                )
              )}
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default ScrapeFullTable;
