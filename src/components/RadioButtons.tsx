import React from "react";
import { useDispatch } from "react-redux";
import styles from "../styles/todos.module.scss";
import {
  visibleType,
  showAll,
  showCompleted,
  showPending,
} from "../redux/todos";

const RadioButtons = () => {
  const dispatch = useDispatch();

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value as visibleType;
    if (value === visibleType.show_all) dispatch(showAll());
    if (value === visibleType.show_completed) dispatch(showCompleted());
    if (value === visibleType.show_pending) dispatch(showPending());
  };

  return (
    <div className={styles.radioButtons}>
      <label className="radio">
        <input
          type="radio"
          name="visibility"
          onChange={handleRadioChange}
          value={visibleType.show_all}
          defaultChecked
        />
        &nbsp;All
      </label>
      <label className="radio">
        <input
          type="radio"
          name="visibility"
          onChange={handleRadioChange}
          value={visibleType.show_completed}
        />
        &nbsp;Completed
      </label>
      <label className="radio">
        <input
          type="radio"
          name="visibility"
          value={visibleType.show_pending}
          onChange={handleRadioChange}
        />
        &nbsp;Pending
      </label>
    </div>
  );
};

export default RadioButtons;
