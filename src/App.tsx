import React from "react";
import Counter from "./components/Counter";
import styles from "./styles/app.module.scss";

interface Props {}

const App: React.FC<Props> = () => {
  return (
    <div className={styles.App}>
      <Counter />
    </div>
  );
};

export default App;
