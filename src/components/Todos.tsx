import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { TextInput, Spinner } from "evergreen-ui";

import { RootState } from "../redux/_store";
import { addTodo, Todo as TodoType } from "../redux/todos";
import styles from "../styles/todos.module.scss";
import Todo from "./Todo";
import RadioButtons from "./RadioButtons";

const Todos = () => {
  const dispatch = useDispatch();
  const { todos, visibleTodos } = useSelector(
    (state: RootState) => state.todos
  );
  const [todo, setTodo] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const fetchInitData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/todos");
        const todos = response.data as TodoType[];
        todos.forEach((todo) => dispatch(addTodo(todo.text)));
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };

    const id = setTimeout(() => fetchInitData(), 1000);
    return () => clearTimeout(id);
    // eslint-disable-next-line
  }, []);

  const handleAddTodo = () => todo.trim() && dispatch(addTodo(todo));
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setTodo(e.target.value);

  return (
    <div className={styles.container}>
      <h1>Todos</h1>
      <div className={styles.input}>
        <p>Todo</p>
        <TextInput
          value={todo}
          placeholder="Add Todo..."
          onChange={handleInputChange}
          onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === "Enter") handleAddTodo();
          }}
        />
        <button onClick={handleAddTodo}>+</button>
      </div>
      <RadioButtons />
      {loading ? (
        <Spinner
          display="flex"
          alignItems="center"
          justifyContent="center"
          size={24}
        />
      ) : (
        todos
          .filter((todo) => visibleTodos.includes(todo.id))
          .map((todo) => <Todo todo={todo} key={todo.id} />)
      )}
    </div>
  );
};

export default Todos;
