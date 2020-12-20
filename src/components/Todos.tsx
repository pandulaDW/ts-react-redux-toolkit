import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/_store";

import { addTodo } from "../redux/todos";
import styles from "../styles/todos.module.scss";
import Todo from "./Todo";

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
      <div className={styles.radioButtons}>
        <label className="radio">
          <input
            type="radio"
            name="visibility"
            value="show_all"
            defaultChecked
          />
          &nbsp;All
        </label>
        <label className="radio">
          <input type="radio" name="visibility" value="show_completed" />
          &nbsp;Completed
        </label>
        <label className="radio">
          <input type="radio" name="visibility" value="show_pending" />
          &nbsp;Pending
        </label>
      </div>
      {todos.map((todo) => (
        <Todo todo={todo} key={todo.id} />
      ))}
    </div>
  );
};

export default Todos;
