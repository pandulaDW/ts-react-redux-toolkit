import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/_store";
import Loader from "../Common/Loader";
import DQTable from "./DQTable";
import DQHeader from "./DQHeader";
import DQSingleTable from "./DQSingleTable";
import { populateKfids } from "../../redux/dq";
import styles from "../../styles/dq.module.scss";

const DQMain = () => {
  const dispatch = useDispatch();
  const { data, view, selectedKfid, loading } = useSelector(
    (state: RootState) => state.dq
  );

  useEffect(() => {
    let kfids: string[] = [];
    data.forEach((item) => {
      kfids = [...kfids, ...item.KFID];
    });
    const distinctKfids = Array.from(new Set(kfids));
    dispatch(populateKfids(distinctKfids));
    // eslint-disable-next-line
  }, [data]);

  let contentNode: React.ReactNode;
  if (loading) {
    contentNode = <Loader message="fetching data..." />;
  } else if (data.length > 0) {
    if (view === "TableView") contentNode = <DQTable data={data} />;
    if (view === "SingleKFIDView")
      contentNode = <DQSingleTable data={data} kfid={selectedKfid as string} />;
  } else {
    contentNode = null;
  }

  return (
    <div className={styles.content}>
      <DQHeader />
      {contentNode}
    </div>
  );
};

export default DQMain;
