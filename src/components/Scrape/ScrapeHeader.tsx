import React from "react";
import { SegmentedControl, Switch, FilePicker, Select } from "evergreen-ui";
import Button from "../Common/Button";
import styles from "../../styles/scrape.module.scss";
import { convertToDTString } from "../../helpers/utils";

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
      <div className={styles.header__right}>
        <Select>
          <option value="all" selected>
            All RAs
          </option>
          <option value="foo">Foo</option>
          <option value="bar">Bar</option>
        </Select>
        <div className={styles["header__right-updateTime"]}>
          <p>Last Updated Time:</p>
          <p>{convertToDTString(new Date())}</p>
        </div>
        <FilePicker
          multiple={false}
          width={250}
          placeholder="Select the file here!"
          marginRight="1.5rem"
        />
        <Button text="Upload" type="Animated" />
      </div>
    </div>
  );
};

export default ScrapeHeader;
