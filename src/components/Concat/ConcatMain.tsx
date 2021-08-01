import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ConcatHeader from "./ConcatHeader";
import ConcatTable from "./ConcatTable";
import { RootState } from "../../redux/_store";
import { fetchInitData } from "../../redux/concat";
import NoResults from "../../images/no_results.png";
import Loader from "../Common/Loader";
import styles from "../../styles/concat.module.scss";

const ConcatMain = () => {
  const dispatch = useDispatch();
  const { initData } = useSelector((state: RootState) => state.concat);

  useEffect(() => {
    if (!initData) dispatch(fetchInitData());
    // eslint-disable-next-line
  }, []);

  const { data, loading, isInitialState } = useSelector(
    (state: RootState) => state.concat
  );

  let contentComponent: React.ReactNode;
  if (loading) contentComponent = <Loader message="fetching data..." />;
  else if (data.length > 0) contentComponent = <ConcatTable data={data} />;
  else if (!isInitialState) contentComponent = <img src={NoResults} alt="No results" />;

  return (
    <div className={styles.content}>
      <ConcatHeader />
      <div className={styles.content__table}>{contentComponent}</div>
    </div>
  );
};

export default ConcatMain;
