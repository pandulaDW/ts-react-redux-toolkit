import React from "react";
import { v4 as uuid } from "uuid";
import { ConcatState } from "../../models/concatTypes";

import styles from "../../styles/tables.module.scss";

interface Props {
  data: ConcatState["data"];
}

const ConcatTable: React.FC<Props> = ({ data }) => {
  let columns = Object.keys(data[0]);

  return (
    <div className={styles.concatTable__table}>
      <table>
        <thead>
          <tr>
            <th>Columns</th>
            {data.map((_, i) => (
              <th key={uuid()}>Result {i + 1}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {columns.map((col) => (
            <tr key={uuid()}>
              <td>{col}</td>
              {data.map((_, i) => (
                <td key={uuid()}>{data[i][col]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      )
    </div>
  );
};

export default ConcatTable;
