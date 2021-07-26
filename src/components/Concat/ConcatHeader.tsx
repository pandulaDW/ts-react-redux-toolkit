import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RadioGroup, TextInputField } from "evergreen-ui";
import { setFileType } from "../../redux/concat";
import { ConcatFileTypes } from "../../models/concatTypes";
import { RootState } from "../../redux/_store";
import Button from "../Common/Button";
import styles from "../../styles/concat.module.scss";

const ConcatHeader = () => {
  const dispatch = useDispatch();
  const { fileType } = useSelector((state: RootState) => state.concat);

  const radioOptions = [
    { label: "Level-2 Data", value: ConcatFileTypes.rr },
    { label: "Level-1 Data", value: ConcatFileTypes.lei },
    { label: "Reporting Exceptions", value: ConcatFileTypes.repex },
  ];

  return (
    <div className={styles.content__header}>
      <div className={styles["content__header-left"]}>
        <RadioGroup
          value={fileType}
          options={radioOptions}
          size={16}
          label="Concat File Type"
          onChange={(e) => dispatch(setFileType(e.target.value as ConcatFileTypes))}
        />
        <div>
          <TextInputField
            description="LEI to search for"
            placeholder="Paste LEI here"
            width={200}
          />
          <Button text="fetch data" type="Animated" />
        </div>
      </div>
      <div className={styles["content__header-right"]}>
        <div>
          <p>Last Processed time</p>
          <p>{new Date().toLocaleString()}</p>
        </div>
        <div>
          <p>Level-2 Data</p>
          <p>{"###############"}</p>
        </div>
        <div>
          <p>Level-1 Data</p>
          <p>{"##################"}</p>
        </div>
        <div>
          <p>Reporting Exceptions</p>
          <p>{"##################"}</p>
        </div>
      </div>
    </div>
  );
};

export default ConcatHeader;
