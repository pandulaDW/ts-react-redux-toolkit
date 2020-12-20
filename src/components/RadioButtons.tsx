import React from "react";
import { Radio } from "evergreen-ui";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/_store";
import styles from "../styles/todos.module.scss";

import {
  visibleType,
  showAll,
  showCompleted,
  showPending,
} from "../redux/todos";

const RadioButtons = () => {
  const dispatch = useDispatch();
  const { visibility } = useSelector((state: RootState) => state.todos);

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as visibleType;
    if (value === visibleType.show_all) dispatch(showAll());
    if (value === visibleType.show_completed) dispatch(showCompleted());
    if (value === visibleType.show_pending) dispatch(showPending());
  };

  return (
    <div className={styles.radioButtons}>
      <Radio
        name="visible"
        label="All"
        checked={visibility === visibleType.show_all}
        value={visibleType.show_all}
        onChange={handleRadioChange}
      />
      <Radio
        name="visible"
        label="Completed"
        checked={visibility === visibleType.show_completed}
        value={visibleType.show_completed}
        onChange={handleRadioChange}
      />
      <Radio
        name="visible"
        label="Pending"
        checked={visibility === visibleType.show_pending}
        value={visibleType.show_pending}
        onChange={handleRadioChange}
      />
    </div>
  );
};

export default RadioButtons;
