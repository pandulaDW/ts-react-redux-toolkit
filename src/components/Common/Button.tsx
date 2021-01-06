import React from "react";
import styles from "../../styles/buttons.module.scss";

type ButtonType = "Animated" | "Jira";

interface Props {
  text: string;
  type: ButtonType;
  clickHandler?: () => void;
}

const Button: React.FC<Props> = ({ text, type, clickHandler }) => {
  let classname: string;
  if (type === "Animated") classname = styles.animatedButton;
  else classname = "button";

  return (
    <button className={classname} onClick={clickHandler}>
      {text}
    </button>
  );
};

export default Button;
