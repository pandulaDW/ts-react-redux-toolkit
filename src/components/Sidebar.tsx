import React from "react";
import { Link } from "react-router-dom";
import { FaFolderOpen, FaCheckDouble, FaChrome } from "react-icons/fa";
import { RiFileExcel2Line } from "react-icons/ri";
import { IoMdAnalytics } from "react-icons/io";

import BSLLabsLogo from "../images/BSL_Labs_-_Aug_2019.png";
import routes from "../routes";
import styles from "../styles/sidebar.module.scss";

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <ul>
        <li>
          <div>
            <FaChrome className={styles.icon} />
            <h4>
              <Link to={routes.scrape}>Scrape Tool</Link>
            </h4>
          </div>
        </li>
        <li>
          <div>
            <FaCheckDouble className={styles.icon} />
            <h4>
              <Link to={routes.dq}>DQ Tool</Link>
            </h4>
          </div>
        </li>
        <li>
          <div>
            <FaFolderOpen className={styles.icon} />
            <h4>
              <Link to={routes.concat}>Concat Files</Link>
            </h4>
          </div>
        </li>
        <li>
          <div>
            <RiFileExcel2Line className={styles.icon} />
            <h4>
              <Link to={routes.sop}>SOP</Link>
            </h4>
          </div>
        </li>
        <li>
          <div>
            <IoMdAnalytics className={styles.icon} />
            <h4>
              <Link to={routes.analytics}>Analytics</Link>
            </h4>
          </div>
        </li>
      </ul>
      <img src={BSLLabsLogo} className={styles.logo} alt="BSL labs logo" />
    </div>
  );
};

export default Sidebar;
