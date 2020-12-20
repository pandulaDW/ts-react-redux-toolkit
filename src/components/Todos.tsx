import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/_store";

import { addTodo } from "../redux/todos";
import styles from "../styles/todos.module.scss";
import Todo from "./Todo";
import RadioButtons from "./RadioButtons";

const Todos = () => {
  const dispatch = useDispatch();
  const { todos } = useSelector((state: RootState) => state.todos);

  const [todo, setTodo] = React.useState("");

  const handleAddTodo = () => todo.trim() && dispatch(addTodo(todo));
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTodo(e.target.value);

  return (
    <div className={styles.container}>
      <h1>Todos</h1>
      <div className={styles.input}>
        <p>Todo</p>
        <input
          type="text"
          value={todo}
          onChange={handleInputChange}
          onKeyPress={(e) => {
            if (e.key === "Enter") handleAddTodo();
          }}
          placeholder="Add Todo..."
        />
        <button onClick={handleAddTodo}>+</button>
      </div>
      <RadioButtons />
      {todos.map((todo) => (
        <Todo todo={todo} key={todo.id} />
      ))}
    </div>
  );
};

export default Todos;
