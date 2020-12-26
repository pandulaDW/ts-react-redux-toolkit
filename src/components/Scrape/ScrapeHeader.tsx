import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { SegmentedControl, Switch, FilePicker, Select } from "evergreen-ui";
import Button from "../Common/Button";
import {
  expandAction,
  selectRaAction,
  setFilterState,
} from "../../redux/scrape";
import styles from "../../styles/scrape.module.scss";
import { convertToDTString } from "../../helpers/utils";
import { RootState } from "../../redux/_store";
import { FilterState } from "../../models/scrapeTypes";

const ScrapeHeader = () => {
  const dispatch = useDispatch();
  const { expand, uniqueRAs, filterState } = useSelector(
    (state: RootState) => state.scrape
  );

  return (
    <div className={styles.header}>
      <div className={styles.header__left}>
        <SegmentedControl
          width={240}
          options={[
            { label: "All", value: FilterState.all },
            { label: "Finished", value: FilterState.finished },
            { label: "On Progress", value: FilterState.progress },
          ]}
          value={filterState}
          onChange={(value) => dispatch(setFilterState(value as FilterState))}
        />
        <div className={styles["header__left-switch"]}>
          <div>
            <Switch
              height={20}
              checked={!expand}
              onChange={() => dispatch(expandAction())}
            />
            <p>Collapse</p>
          </div>
          <div>
            <Switch height={20} />
            <p>Table View</p>
          </div>
        </div>
      </div>
      <div className={styles.header__right}>
        <Select onChange={(e) => dispatch(selectRaAction(e.target.value))}>
          <option value="all" selected>
            All RAs
          </option>
          {uniqueRAs.map((ra) => (
            <option value={ra}>{ra}</option>
          ))}
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
