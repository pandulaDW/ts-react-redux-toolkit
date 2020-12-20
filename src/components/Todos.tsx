import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/_store";

import { addTodo, toggleTodo } from "../redux/todos";
import styles from "../styles/todos.module.scss";
import Todo from "./Todo";

const Todos = () => {
  const dispatch = useDispatch();
  const { todos } = useSelector((state: RootState) => state.todos);

  const [todo, setTodo] = React.useState("");

  const handleAddTodo = () => todo && dispatch(addTodo(todo));
  const handleToggleTodo = () => dispatch(toggleTodo(12));
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTodo(e.target.value);

  return (
    <div className={styles.container}>
      <h1>Todos</h1>
      <div className={styles.input}>
        <p>Todo</p>
        <input type="text" value={todo} onChange={handleInputChange} />
        <button>+</button>
      </div>
      {todos.map((todo) => (
        <Todo todo={todo} key={todo.id} />
      ))}
    </div>
  );
};

export default Todos;
