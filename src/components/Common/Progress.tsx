import React from "react";
import ProgressBar from "@ramonak/react-progress-bar";
import styles from "../../styles/loader.module.scss";

interface Props {
  completed: number;
}

const Progress: React.FC<Props> = ({ completed }) => {
  return (
    <div className={styles.progressBar}>
      <ProgressBar
        completed={completed}
        width={"30%"}
        margin="150px auto"
        bgcolor="#10b981"
        baseBgColor="#d1d5db"
        labelSize="13px"
      />
      <p>Fetching data...</p>
    </div>
  );
};

export default Progress;
