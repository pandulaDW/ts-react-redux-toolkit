import React from "react";
import DQTable from "./DQTable";
import DQHeader from "./DQHeader";
import styles from "../../styles/dq.module.scss";

const DQMain = () => {
  return (
    <div className={styles.content}>
      <DQHeader />
      <DQTable />
    </div>
  );
};

export default DQMain;
