import { useSelector } from "react-redux";
import ConcatHeader from "./ConcatHeader";
import ConcatTable from "./ConcatTable";
import { RootState } from "../../redux/_store";
import NoResults from "../../images/no_results.png";
import styles from "../../styles/concat.module.scss";

const ConcatMain = () => {
  const { data } = useSelector((state: RootState) => state.concat);

  return (
    <div className={styles.content}>
      <ConcatHeader />
      <div className={styles.content__table}>
        {data.length > 0 ? (
          <ConcatTable data={data} />
        ) : (
          <img src={NoResults} alt="No results" />
        )}
      </div>
    </div>
  );
};

export default ConcatMain;
