import React from "react";
import styles from "../../styles/buttons.module.scss";

type ButtonType = "Animated" | "Jira";

interface Props {
  text: string;
  type: ButtonType;
}

const Button: React.FC<Props> = ({ text, type }) => {
  let classname: string;
  if (type === "Animated") classname = styles.animatedButton;
  else classname = "button";

  return <button className={classname}>{text}</button>;
};

export default Button;
