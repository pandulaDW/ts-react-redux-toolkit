import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/_store";
import DQTable from "./DQTable";
import DQHeader from "./DQHeader";
import styles from "../../styles/dq.module.scss";

const DQMain = () => {
  const { data } = useSelector((state: RootState) => state.dq);

  return (
    <div className={styles.content}>
      <DQHeader />
      <DQTable data={data} />
    </div>
  );
};

export default DQMain;
