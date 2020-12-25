import React from "react";
import { useSelector } from "react-redux";
import { v4 as uuid } from "uuid";
import { Accordion } from "react-accessible-accordion";
import { RootState } from "../../redux/_store";
import ScrapeSingleTable from "./ScrapeSingleTable";
import styles from "../../styles/scrape.module.scss";

const ScrapeContent = () => {
  const { ScrapeData } = useSelector((state: RootState) => state.scrape);

  return (
    <Accordion allowMultipleExpanded allowZeroExpanded>
      <div className={styles.dataContent}>
        {ScrapeData.map((el) => {
          return <ScrapeSingleTable key={uuid()} data={el} />;
        })}
      </div>
    </Accordion>
  );
};

export default ScrapeContent;
