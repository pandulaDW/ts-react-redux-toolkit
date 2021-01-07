import React from "react";
import ProgressBar from "@ramonak/react-progress-bar";

interface Props {
  completed: number;
}

const Progress: React.FC<Props> = ({ completed }) => {
  return (
    <div>
      <ProgressBar completed={completed} width={"30%"} margin="150px auto" />
      <p>Fetching data...</p>
    </div>
  );
};

export default Progress;
