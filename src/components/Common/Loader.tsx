import React from "react";
import { Spinner } from "evergreen-ui";
import styles from "../../styles/loader.module.scss";

interface Props {
  message: string;
}

const Loader: React.FC<Props> = ({ message }) => {
  return (
    <div className={styles.container}>
      <Spinner
        display="flex"
        alignItems="center"
        justifyContent="center"
        size={54}
      />
      <p>{message}</p>
    </div>
  );
};

export default Loader;
