import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MdRefresh } from "react-icons/md";
import { FcClearFilters } from "react-icons/fc";
import cx from "classnames";
import { SegmentedControl, Switch, FilePicker, Select } from "evergreen-ui";
import Button from "../Common/Button";
import {
  expandAction,
  selectRaAction,
  setFilterState,
  setDataView,
  fetchScrapeData,
  fetchOnlyData,
  clearAllTableFilters,
} from "../../redux/scrape";
import styles from "../../styles/scrape.module.scss";
import { convertToDTString } from "../../helpers/utils";
import { RootState } from "../../redux/_store";
import { FilterState, DataView } from "../../models/scrapeTypes";

const ScrapeHeader = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState<File | null>(null);
  const {
    expand,
    uniqueRAs,
    filterState,
    filterTableCols,
    timestamp,
    dataView,
    loading,
    fileDetails,
    ScrapeData,
  } = useSelector((state: RootState) => state.scrape);

  const showReloadButton = () => {
    return fileDetails.numRecords !== 0 && ScrapeData.length < fileDetails.numRecords;
  };

  const showClearFilterButton = () => {
    return dataView === DataView.table && Object.keys(filterTableCols).length > 0;
  };

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
        {showClearFilterButton() && (
          <button
            className={styles["header__left-clearButton"]}
            onClick={() => dispatch(clearAllTableFilters())}
          >
            <span>Clear Filters</span>
            <FcClearFilters />
          </button>
        )}
        {showReloadButton() && (
          <div className={styles["header__left-reload"]}>
            <div>
              <MdRefresh onClick={() => dispatch(fetchOnlyData())} />
            </div>
            <div>
              <p>Reload</p>
              <p>Data</p>
            </div>
          </div>
        )}
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
          onChange={(fileList) => setFile(fileList[0])}
        />
        <Button
          text="Upload"
          type="Animated"
          clickHandler={() =>
            file && dispatch(fetchScrapeData({ isInitial: false, file }))
          }
        />
      </div>
    </div>
  );
};

export default ScrapeHeader;
