import React from "react";
import { useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { FaCheckCircle, FaGlobe } from "react-icons/fa";
import { IoMdAlert } from "react-icons/io";
import { MdFormatIndentDecrease } from "react-icons/md";
import { RootState } from "../../redux/_store";
import { ScrapeDataType } from "../../models/scrapeTypes";
import { capitalize } from "../../helpers/utils";
import styles from "../../styles/tables.module.scss";

interface Props {
  data: ScrapeDataType;
}

const ScrapeSingleTable: React.FC<Props> = ({ data }) => {
  const { fieldList } = useSelector((state: RootState) => state.scrape);

  return (
    <div className={styles.scrapeSingle}>
      <div className={styles.scrapeSingle__header}>
        <p>{`KeyID - ${data.kfid} | CompanyID - ${data.company_id} | RaID - ${data.RAId}`}</p>
        <div>
          <FaGlobe className={styles["scrapeSingle__header-icon"]} />
          <FaCheckCircle className={styles["scrapeSingle__header-icon"]} />
          <IoMdAlert className={styles["scrapeSingle__header-icon"]} />
          <MdFormatIndentDecrease
            className={styles["scrapeSingle__header-icon"]}
          />
        </div>
      </div>
      <div className={styles.scrapeSingle__table}>
        <table>
          <thead>
            <tr>
              <th>Fields</th>
              <th>UV Data</th>
              <th>Scraped Data</th>
              <th>Result</th>
            </tr>
          </thead>
          <tbody>
            {fieldList.map((field) => {
              return field in data ? (
                <tr key={uuid()}>
                  <td>{capitalize(field)}</td>
                  <td>{data[field].uv_value}</td>
                  <td>{data[field].scraped_value}</td>
                  <td>{data[field].match ? "Match" : "No Match"}</td>
                </tr>
              ) : (
                <tr key={uuid()}>
                  <td>{capitalize(field)}</td>
                  <td></td>
                  <td></td>
                  <td></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScrapeSingleTable;
