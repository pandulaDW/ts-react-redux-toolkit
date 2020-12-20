import React from "react";
import { useDispatch } from "react-redux";
import styles from "../styles/todos.module.scss";
import { showAll, showCompleted, showPending } from "../redux/todos";

enum visibleType {
  show_all = "show_all",
  show_completed = "show_completed",
  show_pending = "show_pending",
}

const RadioButtons = () => {
  const dispatch = useDispatch();
  const [visibility, setVisibility] = React.useState(visibleType.show_all);

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVisibility(e.target.value as visibleType);
    if (visibility === visibleType.show_all) dispatch(showAll());
    if (visibility === visibleType.show_completed) dispatch(showCompleted());
    if (visibility === visibleType.show_pending) dispatch(showPending());
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
