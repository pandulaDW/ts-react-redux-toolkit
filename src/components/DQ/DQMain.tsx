import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/_store";
import DQTable from "./DQTable";
import DQHeader from "./DQHeader";
import DQSingleTable from "./DQSingleTable";
import { populateKfids } from "../../redux/dq";
import styles from "../../styles/dq.module.scss";

const DQMain = () => {
  const dispatch = useDispatch();
  const { data, view, selectedKfid } = useSelector((state: RootState) => state.dq);

  useEffect(() => {
    let kfids: string[] = [];
    data.forEach((item) => {
      kfids = [...kfids, ...item.KFID];
    });
    const distinctKfids = Array.from(new Set(kfids));
    dispatch(populateKfids(distinctKfids));
    // eslint-disable-next-line
  }, [data]);

  const contentNode =
    view === "TableView" ? (
      <DQTable data={data} />
    ) : (
      <DQSingleTable data={data} kfid={selectedKfid as string} />
    );

  return (
    <div className={styles.content}>
      <DQHeader />
      {data.length > 0 && contentNode}
    </div>
  );
};

export default DQMain;
