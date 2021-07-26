import styles from "../../styles/concat.module.scss";
import ConcatHeader from "./ConcatHeader";

const ConcatMain = () => {
  return (
    <div className={styles.content}>
      <ConcatHeader />
    </div>
  );
};

export default ConcatMain;
