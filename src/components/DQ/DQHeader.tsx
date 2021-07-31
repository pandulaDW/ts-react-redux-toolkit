import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Select, { ValueType } from "react-select";
import { FilePicker } from "evergreen-ui";
import { fetchData, setKfid, setView, clearAll } from "../../redux/dq";
import Button from "../Common/Button";
import { fileToBase64 } from "../../helpers/utils";
import { RootState } from "../../redux/_store";
import styles from "../../styles/dq.module.scss";

const DQHeader = () => {
  const dispatch = useDispatch();
  const { kfids } = useSelector((state: RootState) => state.dq);

  const [file, setFile] = useState<File | null>(null);
  const selectOptions = kfids.map((kfid) => ({ value: kfid, label: kfid }));

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
    <div className={styles.header}>
      <div className={styles.header__left}>
        <Select
          options={selectOptions}
          isClearable
          isSearchable
          onChange={selectHandler}
        />
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
        <Button text="Download Excel" type="Animated" />
      </div>
    </div>
  );
};

export default DQHeader;
