import React from "react";
import { v4 as uuid } from "uuid";
import { DQItem, MetaData, colorObj, ImpactToColor } from "../../models/dqTypes";

import styles from "../../styles/dq.module.scss";
import tableStyles from "../../styles/tables.module.scss";

interface Props {
  data: DQItem[];
  kfid: string;
}

const DQSingleTable: React.FC<Props> = ({ data, kfid }) => {
  let metaData = {} as MetaData;

  for (const item of data) {
    if (item.KFID.includes(kfid)) {
      metaData = item.metadata[kfid];
      break;
    } else {
      continue;
    }
  }

  const kfidData = data.filter((item) => item.KFID.includes(kfid));

  return (
    <div className={styles.singleTable}>
      <div className={styles.singleTable__metadata}>
        <h1>KFID: {kfid}</h1>
        <ul>
          <li>
            <span>Data: </span>
            <span>{new Date().toDateString()}</span>
          </li>
          <li>
            <span>Lei Status: </span>
            <span>{metaData.LEIStatus}</span>
          </li>
          <li>
            <span>Entity Name: </span>
            <span>{metaData.OfficialEntityName}</span>
          </li>
          <li>
            <span>Owner: </span>
            <span>{metaData.Owner}</span>
          </li>
          <li>
            <span>Count: </span>
            <span>{kfidData.length}</span>
          </li>
        </ul>
      </div>
      <div className={tableStyles.dqSingleTable}>
        <table>
          <thead>
            <tr>
              <th>Error Category</th>
              <th>Error Impact</th>
              <th>Fields or Related Field</th>
              <th>Error Description</th>
            </tr>
          </thead>
          <tbody>
            {kfidData.map((item) => (
              <tr key={uuid()}>
                <td>{item["errorType"]}</td>
                <td>
                  <span
                    style={{
                      backgroundColor: colorObj[ImpactToColor[item["Impact"]]],
                      padding: "5px 10px",
                      color: "#fff",
                    }}
                  >
                    {item["Impact"]}
                  </span>
                </td>
                <td>{item["errorColumn"]}</td>
                <td>{item["error"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DQSingleTable;
