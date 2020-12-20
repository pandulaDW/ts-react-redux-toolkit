import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { Todo as TodoType } from "../redux/todos";

import styles from "../styles/todos.module.scss";

interface Props {
  todo: TodoType;
}

const Todo: React.FC<Props> = ({ todo }) => {
  return (
    <div className={styles.todoContainer}>
      <h3>{todo.id} -</h3>
      <h3>{todo.text}</h3>
      <FaCheckCircle
        className={styles.correctIcon}
        style={{
          color: todo.completed ? "green" : "brown",
        }}
      />
    </div>
  );
};

export default Todo;
