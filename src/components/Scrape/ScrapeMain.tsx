import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styles from "../../styles/scrape.module.scss";
import ScrapeContent from "./ScrapeContent";
import ScrapeHeader from "./ScrapeHeader";
import Loader from "../Common/Loader";
import ScrapeReportBox from "./ScrapeReportBox";
import { fetchScrapeData } from "../../redux/scrape";
import { RootState } from "../../redux/_store";

const ScrapeMain = () => {
  const dispatch = useDispatch();

  const {
    loading,
    ScrapeData,
    fileDetails: { numRecords },
  } = useSelector((state: RootState) => state.scrape);

  useEffect(() => {
    if (ScrapeData.length === 0)
      dispatch(fetchScrapeData({ file: null, isInitial: true }));
    // eslint-disable-next-line
  }, []);

  let component: JSX.Element;
  if (loading) {
    if (ScrapeData.length > 0) {
      component = <Loader message={`scraping ${numRecords} records...`} />;
    } else {
      component = <Loader message="fetching initial data..." />;
    }
  } else {
    component = (
      <React.Fragment>
        <ScrapeReportBox numRecords={ScrapeData.length} numFetched={numRecords} />
        <ScrapeContent />
      </React.Fragment>
    );
  }

  return (
    <div className={styles.content}>
      <ScrapeHeader />
      {component}
    </div>
  );
};

export default ScrapeMain;
