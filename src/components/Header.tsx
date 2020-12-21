import React from "react";
import { useLocation } from "react-router-dom";
import gleifLogo from "../images/gleif-logo-full.png";
import lsegLogo from "../images/LSEG_LOGO_RGB_GWB_0.png";
import styles from "../styles/header.module.scss";
import routes from "../routes";

const titleMap = [
  { route: routes.scrape, title: "Scrape Tool", subtitle: "Scraping RAs" },
  { route: routes.dq, title: "DQ Tool", subtitle: "Validate LEIs" },
  {
    route: routes.concat,
    title: "Concat Tool",
    subtitle: "Search through GLEIF Files",
  },
  {
    route: routes.sop,
    title: "SOP Tool",
    subtitle: "Standard Operating Procedure",
  },
  {
    route: routes.analytics,
    title: "Analytics Tool",
    subtitle: "Analyse performance",
  },
];

const Header = () => {
  let location = useLocation();
  const headerObj = titleMap.find((el) => location.pathname === el.route);

  return (
    <div className={styles.container}>
      <img src={gleifLogo} alt="glief logo" className={styles.glief_logo} />
      <div className={styles.title}>
        <h1>
          <span>{headerObj?.title.split(" ")[0]}</span>{" "}
          {headerObj?.title.split(" ")[1]}
        </h1>
        <h4>{headerObj?.subtitle}</h4>
      </div>
      <img src={lsegLogo} alt="LSEG logo" className={styles.lsegLogo} />
    </div>
  );
};

export default Header;
