import React from "react";
import { DQItem } from "../../models/dqTypes";

interface Props {
  data: DQItem[];
  kfid: string;
}

const DQSingleTable: React.FC<Props> = ({ data, kfid }) => {
  const kfidData = data.filter((item) => item.KFID.includes(kfid));

  return <div>This is single table for {kfid}</div>;
};

export default DQSingleTable;
