import React from "react";
import { useDispatch, useSelector } from "react-redux";
import cx from "classnames";
import { SegmentedControl, Switch, FilePicker, Select } from "evergreen-ui";
import Button from "../Common/Button";
import {
  expandAction,
  selectRaAction,
  setFilterState,
  setDataView,
  fetchScrapeData,
} from "../../redux/scrape";
import styles from "../../styles/scrape.module.scss";
import { convertToDTString } from "../../helpers/utils";
import { sendScrapeRequests } from "../../helpers/scrapeUtils";
import { RootState } from "../../redux/_store";
import { FilterState, DataView } from "../../models/scrapeTypes";

const ScrapeHeader = () => {
  const dispatch = useDispatch();
  const { expand, uniqueRAs, filterState, timestamp, dataView, loading } =
    useSelector((state: RootState) => state.scrape);

  return (
    <div className={cx(styles.header, { blockElement: loading })}>
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
              disabled={dataView === DataView.table}
              onChange={() => dispatch(expandAction())}
            />
            <p>Collapse</p>
          </div>
          <div>
            <Switch
              height={20}
              checked={dataView === DataView.table}
              onChange={() => dispatch(setDataView())}
            />
            <p>Table View</p>
          </div>
        </div>
      </div>
      <div className={styles.header__right}>
        <Select onChange={(e) => dispatch(selectRaAction(e.target.value))}>
          <option value="all">All RAs</option>
          {uniqueRAs.map((ra, id) => (
            <option value={ra} key={id}>
              {ra}
            </option>
          ))}
        </Select>
        <div className={styles["header__right-updateTime"]}>
          <p>Last Updated Time:</p>
          <p>{convertToDTString(timestamp)}</p>
        </div>
        <FilePicker
          multiple={false}
          width={250}
          placeholder="Select the file here!"
          marginRight="1.5rem"
          onChange={(fileList) => {
            const file = fileList[0];
            sendScrapeRequests(file);
          }}
        />
        <Button
          text="Upload"
          type="Animated"
          clickHandler={() => dispatch(fetchScrapeData(false))}
        />
      </div>
    </div>
  );
};

export default ScrapeHeader;
