import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { useDispatch } from "react-redux";

import { Todo as TodoType } from "../redux/todos";
import { toggleTodo } from "../redux/todos";
import styles from "../styles/todos.module.scss";

interface Props {
  todo: TodoType;
}

const Todo: React.FC<Props> = ({ todo }) => {
  const dispatch = useDispatch();
  const handleToggleTodo = () => dispatch(toggleTodo(todo.id));

  return (
    <div className={styles.todoContainer}>
      <h3>{todo.id} -</h3>
      <h3>{todo.text}</h3>
      <FaCheckCircle
        className={styles.correctIcon}
        style={{
          color: todo.completed ? "green" : "brown",
        }}
        onClick={handleToggleTodo}
      />
    </div>
  );
};

export default Todo;
