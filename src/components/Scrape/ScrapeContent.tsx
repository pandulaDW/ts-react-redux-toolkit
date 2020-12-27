import React from "react";
import { useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { Accordion } from "react-accessible-accordion";
import { RootState } from "../../redux/_store";
import { DataView } from "../../models/scrapeTypes";
import ScrapeSingleTable from "./ScrapeSingleTable";
import { intersection } from "../../helpers/utils";
import styles from "../../styles/scrape.module.scss";
import ScrapeFullTable from "./ScrapeFullTable";

const ScrapeContent = () => {
  const { filteredByView, filteredByRA, ScrapeData, dataView } = useSelector(
    (state: RootState) => state.scrape
  );

  const filteredIDs = intersection(filteredByRA, filteredByView);
  const filteredData = ScrapeData.filter((data) =>
    filteredIDs.includes(data.kfid)
  );

  return (
    <div className={styles.dataContent}>
      {dataView === DataView.single ? (
        filteredData.map((el) => {
          return (
            <Accordion allowMultipleExpanded allowZeroExpanded>
              <ScrapeSingleTable key={uuid()} data={el} />
            </Accordion>
          );
        })
      ) : (
        <ScrapeFullTable data={filteredData} />
      )}
    </div>
  );
};

export default ScrapeContent;
