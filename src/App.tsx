import React from "react";
import styles from "./styles/app.module.scss";

interface Props {}

const App: React.FC<Props> = () => {
  return (
    <div className={styles.App}>
      <h2>Working fine</h2>
    </div>
  );
};

export default App;
