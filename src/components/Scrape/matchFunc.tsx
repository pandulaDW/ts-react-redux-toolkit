import { v4 as uuid } from "uuid";
import styles from "../../styles/scrape.module.scss";

export const matchFunc = (val1: string, val2: string, match: boolean) => {
  if (!val1 || !val2) {
    if (!val1) return <div></div>;
    return <div>val1</div>;
  }

  if (match) {
    return (
      <div>
        {val1.split(/[\s,-/|_]/).map((word) => (
          <span key={uuid()} className={styles.matchingText}>
            {word}{" "}
          </span>
        ))}
      </div>
    );
  }

  return (
    <div>
      {val1.split(/[\s,-/|_]/).map((word) => {
        let classname = styles.unMatchingText;
        if (
          val2
            .toLowerCase()
            .replace(/[.,-]/g, "")
            .includes(word.toLowerCase().replace(/[.,-]/g, ""))
        ) {
          classname = styles.matchingText;
        }
        return (
          <span key={uuid()} className={classname}>
            {word}{" "}
          </span>
        );
      })}
    </div>
  );
};
