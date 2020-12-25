import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/scrape.module.scss";
import ScrapeContent from "./ScrapeContent";
import ScrapeHeader from "./ScrapeHeader";
import Loader from "../Common/Loader";
import { fetchInitData } from "../../redux/scrape";
import { RootState } from "../../redux/_store";

const ScrapeMain = () => {
  const dispatch = useDispatch();
  const { loading, ScrapeData } = useSelector(
    (state: RootState) => state.scrape
  );

  useEffect(() => {
    if (ScrapeData.length === 0) dispatch(fetchInitData());
    // eslint-disable-next-line
  }, []);

  return (
    <div className={styles.content}>
      <ScrapeHeader />
      {loading ? (
        <Loader message="fetching initial data..." />
      ) : (
        <ScrapeContent />
      )}
    </div>
  );
};

export default ScrapeMain;
