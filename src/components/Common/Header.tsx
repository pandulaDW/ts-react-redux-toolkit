import cx from "classnames";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import gleifLogo from "../../images/gleif-logo-full.png";
import lsegLogo from "../../images/LSEG_LOGO_RGB_GWB_0.png";
import routes from "../../routes";
import { RootState } from "../../redux/_store";
import styles from "../../styles/header.module.scss";
import "../../styles/_global.scss";

const titleMap = [
  {
    route: routes.scrape,
    title: "Scrape Tool",
    subtitle: "Scraping RAs",
    browserTitle: "LEI  |  Scrape",
  },
  {
    route: routes.dq,
    title: "DQ Tool",
    subtitle: "Validate LEIs",
    browserTitle: "LEI  |  DQ",
  },
  {
    route: routes.concat,
    title: "Concat Tool",
    subtitle: "Search through GLEIF Files",
    browserTitle: "LEI  |  Concat",
  },
  {
    route: routes.sop,
    title: "SOP Tool",
    subtitle: "Standard Operating Procedure",
    browserTitle: "LEI  |  SOP",
  },
  {
    route: routes.analytics,
    title: "Analytics Tool",
    subtitle: "Analyse performance",
    browserTitle: "LEI  |  Analytics",
  },
];

const Header = () => {
  let location = useLocation();
  const headerObj = titleMap.find((el) => location.pathname === el.route);

  // update document title
  document.title = headerObj!.browserTitle;

  const { loading } = useSelector((state: RootState) => state.scrape);

  return (
    <div className={cx(styles.container, { blockElement: loading })}>
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
