import React from "react";
import cx from "classnames";
import { useDispatch, useSelector } from "react-redux";
import { RadioGroup, TextInputField } from "evergreen-ui";
import { setFileType, setValue, fetchData } from "../../redux/concat";
import { ConcatFileTypes } from "../../models/concatTypes";
import { RootState } from "../../redux/_store";
import Button from "../Common/Button";
import { convertDateToString } from "../../helpers/utils";
import styles from "../../styles/concat.module.scss";

const ConcatHeader = () => {
  const dispatch = useDispatch();
  const { fileType, loading, initData } = useSelector((state: RootState) => state.concat);

  const radioOptions = [
    { label: "Level-2 Data", value: ConcatFileTypes.rr },
    { label: "Level-1 Data", value: ConcatFileTypes.lei },
    { label: "Reporting Exceptions", value: ConcatFileTypes.repex },
  ];

  const placeholder = "###############";

  return (
    <div className={cx(styles.content__header, { blockElement: loading })}>
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
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              dispatch(setValue(e.target.value))
            }
          />
          <Button
            text="fetch data"
            type="Animated"
            clickHandler={() => dispatch(fetchData())}
          />
        </div>
      </div>
      <div className={styles["content__header-right"]}>
        <div>
          <p>Last Processed time</p>
          <p>
            {initData
              ? convertDateToString(new Date(initData["last_modified"]["repexFile"]))
              : placeholder}
          </p>
        </div>
        <div>
          <p>Level-2 Data</p>
          <p>
            {initData
              ? `${initData["counts"]["rrFile"].toLocaleString()} records`
              : placeholder}
          </p>
        </div>
        <div>
          <p>Level-1 Data</p>
          <p>
            {initData
              ? `${initData["counts"]["leiFile"].toLocaleString()} records`
              : placeholder}
          </p>
        </div>
        <div>
          <p>Reporting Exceptions</p>
          <p>
            {initData
              ? `${initData["counts"]["repexFile"].toLocaleString()} records`
              : placeholder}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ConcatHeader;
