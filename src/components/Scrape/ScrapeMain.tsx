import React from "react";
import styles from "../../styles/scrape.module.scss";
import ScrapeHeader from "./ScrapeHeader";

const ScrapeMain = () => {
  return (
    <div className={styles.content}>
      <ScrapeHeader />
    </div>
  );
};

export default ScrapeMain;
