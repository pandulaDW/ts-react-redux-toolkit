import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { FaCheckCircle, FaGlobe } from "react-icons/fa";
import { IoMdAlert } from "react-icons/io";
import { MdFormatIndentDecrease } from "react-icons/md";
import {
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from "react-accessible-accordion";
import cx from "classnames";
import { RootState } from "../../redux/_store";
import { setLocalFinished, setLocalProgress } from "../../redux/scrape";
import { ScrapeDataType } from "../../models/scrapeTypes";
import { capitalize } from "../../helpers/utils";
import styles from "../../styles/tables.module.scss";
import { matchFunc } from "./matchFunc";

interface Props {
  data: ScrapeDataType;
}

const ScrapeSingleTable: React.FC<Props> = ({ data }) => {
  const dispatch = useDispatch();
  const { fieldList, expand } = useSelector((state: RootState) => state.scrape);
  const [localExpand, setLocalExpand] = useState(expand);
  const headerClass = cx(styles.scrapeSingle__header, {
    [styles.finished]: data.finished,
    [styles.progress]: data.onProgress,
  });

  return (
    <div className={styles.scrapeSingle}>
      <AccordionItem uuid={data.kfid} dangerouslySetExpanded={localExpand}>
        <div className={headerClass}>
          <p>{`KeyID - ${data.kfid} | CompanyID - ${data.company_id} | RaID - ${data.RAId}`}</p>
          <div>
            <FaGlobe className={styles["scrapeSingle__header-icon"]} />
            <FaCheckCircle
              className={styles["scrapeSingle__header-icon"]}
              onClick={() => dispatch(setLocalFinished(data.kfid))}
            />
            <IoMdAlert
              className={styles["scrapeSingle__header-icon"]}
              onClick={() => dispatch(setLocalProgress(data.kfid))}
            />
            <AccordionItemHeading>
              <AccordionItemButton style={{ display: "flex" }}>
                <MdFormatIndentDecrease
                  className={styles["scrapeSingle__header-icon"]}
                  onClick={() => setLocalExpand(!localExpand)}
                />
              </AccordionItemButton>
            </AccordionItemHeading>
          </div>
        </div>
        <AccordionItemPanel>
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
                      <td>
                        {matchFunc(
                          data[field].uv_value,
                          data[field].scraped_value
                        )}
                      </td>
                      <td>
                        {matchFunc(
                          data[field].scraped_value,
                          data[field].uv_value
                        )}
                      </td>
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
        </AccordionItemPanel>
      </AccordionItem>
    </div>
  );
};

export default ScrapeSingleTable;
