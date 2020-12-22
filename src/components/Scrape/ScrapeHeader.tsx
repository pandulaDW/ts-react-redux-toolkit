import React from "react";
import { SegmentedControl, Switch } from "evergreen-ui";
import styles from "../../styles/scrape.module.scss";

const ScrapeHeader = () => {
  return (
    <div className={styles.header}>
      <div className={styles.header__left}>
        <SegmentedControl
          width={240}
          options={[
            { label: "All", value: "all" },
            { label: "Finished", value: "finished" },
            { label: "On Progress", value: "on-progress" },
          ]}
          value="all"
          onChange={(value) => console.log(value)}
        />
        <div className={styles["header__left-switch"]}>
          <div>
            <Switch height={20} checked />
            <p>Collapse</p>
          </div>
          <div>
            <Switch height={20} />
            <p>Table View</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScrapeHeader;
