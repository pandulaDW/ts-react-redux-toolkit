import React from "react";
import { useSelector } from "react-redux";
import cx from "classnames";
import { Link } from "react-router-dom";
import { FaFolderOpen, FaCheckDouble, FaChrome } from "react-icons/fa";

import { RootState } from "../../redux/_store";
import BSLLabsLogo from "../../images/BSL_Labs_-_Aug_2019.png";
import routes from "../../routes";
import styles from "../../styles/sidebar.module.scss";
import { getUserName, tokenNames } from "../Auth/auth";
import "../../styles/_global.scss";

const Sidebar = () => {
  const { loading } = useSelector((state: RootState) => state.scrape);
  const username = getUserName();

  // clear tokens and reload the page
  const signout = () => {
    localStorage.removeItem(tokenNames.ACCESS);
    localStorage.removeItem(tokenNames.ID);
    window.location.reload();
  };

  return (
    <div className={cx(styles.sidebar, { blockElement: loading })}>
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
      </ul>
      <img src={BSLLabsLogo} className={styles.logo} alt="BSL labs logo" />
      {username && (
        <div className={styles.sidebar__username}>
          <p>{username}</p>
          <p onClick={signout}>Sign Out</p>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
