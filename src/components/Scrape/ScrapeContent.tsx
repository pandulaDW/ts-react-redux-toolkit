import React from "react";
import { useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { Accordion } from "react-accessible-accordion";
import { RootState } from "../../redux/_store";
import ScrapeSingleTable from "./ScrapeSingleTable";
import { intersection } from "../../helpers/utils";
import styles from "../../styles/scrape.module.scss";

const ScrapeContent = () => {
  const { filteredByView, filteredByRA, ScrapeData } = useSelector(
    (state: RootState) => state.scrape
  );

  const filteredIDs = intersection(filteredByRA, filteredByView);

  return (
    <Accordion allowMultipleExpanded allowZeroExpanded>
      <div className={styles.dataContent}>
        {ScrapeData.filter((data) => filteredIDs.includes(data.kfid)).map(
          (el) => {
            return <ScrapeSingleTable key={uuid()} data={el} />;
          }
        )}
      </div>
    </Accordion>
  );
};

export default ScrapeContent;
