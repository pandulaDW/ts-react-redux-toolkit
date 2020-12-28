import React from "react";
import styles from "../../styles/flexTable.module.scss";

const FlexTable = () => {
  return (
    <div className={styles.container}>
      <div className={styles.container__header}>
        <div className={styles["container__header-headerCell"]}>
          This is header
        </div>
      </div>
      <div className={styles.container__body}>
        <div className={styles["container__body-row"]}>section 1</div>
        <div className={styles["container__body-row"]}>section 2</div>
        <div className={styles["container__body-row"]}>section 3</div>
        <div className={styles["container__body-row"]}>section 4</div>
        <div className={styles["container__body-row"]}>section 5</div>
      </div>
    </div>
  );
};

export default FlexTable;
