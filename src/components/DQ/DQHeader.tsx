import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Select, { ValueType } from "react-select";
import cx from "classnames";
import { FilePicker } from "evergreen-ui";
import { FcClearFilters } from "react-icons/fc";
import {
  fetchData,
  setKfid,
  setView,
  clearAll,
  clearAllTableFilters,
} from "../../redux/dq";
import Button from "../Common/Button";
import { fileToBase64 } from "../../helpers/utils";
import { RootState } from "../../redux/_store";
import { downloadDQExcel } from "../../helpers/apiCalls";
import styles from "../../styles/dq.module.scss";

const DQHeader = () => {
  const dispatch = useDispatch();
  const { kfids, loading, timestamp, filterTableCols } = useSelector(
    (state: RootState) => state.dq
  );

  const [file, setFile] = useState<File | null>(null);
  const selectOptions = kfids.map((kfid) => ({ value: kfid, label: kfid }));

  const showClearFilterButton = () => {
    return Object.keys(filterTableCols).length > 0;
  };

  const clickHandler = async () => {
    if (!file) return;
    try {
      const fileContent = await fileToBase64(file);
      dispatch(fetchData({ uploaded_file: fileContent }));
    } catch (err) {
      console.error(err);
      return;
    }
  };

  const downloadExcelHandler = async () => {
    const time = timestamp as number;
    const response = await downloadDQExcel(time);
    const bstr = atob(response.data.file);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    const filename = `DQCheck-${new Date(time)
      .toDateString()
      .split(" ")
      .join("_")}-${new Date(time)
      .toTimeString()
      .split(/[:\s]/)
      .splice(0, 3)
      .join("_")}.xlsx`;

    const file = new File([u8arr], filename, {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const url = window.URL.createObjectURL(file);
    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const selectHandler = (
    e: ValueType<
      {
        value: string;
        label: string;
      },
      false
    >
  ) => {
    if (e?.value) {
      dispatch(setKfid(e.value));
      dispatch(setView("SingleKFIDView"));
    } else {
      dispatch(setView("TableView"));
    }
  };

  return (
    <div className={cx(styles.header, { blockElement: loading })}>
      <div className={styles.header__left}>
        <Select
          style={{ width: "20px" }}
          options={selectOptions}
          isClearable
          isSearchable
          onChange={selectHandler}
        />
        {showClearFilterButton() && (
          <button
            className={styles["header__left-clearButton"]}
            onClick={() => dispatch(clearAllTableFilters())}
          >
            <span>Clear Filters</span>
            <FcClearFilters />
          </button>
        )}
      </div>
      <div className={styles.header__right}>
        <Button text="Clear All" type="Jira" clickHandler={() => dispatch(clearAll())} />
        <FilePicker
          multiple={false}
          width={250}
          placeholder="Select the file here!"
          marginRight="1.5rem"
          onChange={(fileList) => setFile(fileList[0])}
        />
        <Button text="Upload" type="Animated" clickHandler={clickHandler} />
        <Button
          text="Download Excel"
          type="Animated"
          clickHandler={downloadExcelHandler}
        />
      </div>
    </div>
  );
};

export default DQHeader;
