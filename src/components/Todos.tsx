// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { TextInput, Spinner, toaster } from "evergreen-ui";

// import { RootState } from "../redux/_store";
// import { addTodo, fetchInitData } from "../redux/todos";
// import styles from "../styles/todos.module.scss";
// import Todo from "./Todo";
// import RadioButtons from "./RadioButtons";

const Todos = () => {
  //   const dispatch = useDispatch();
  //   const { todos, visibleTodos, loading, fetchError } = useSelector(
  //     (state: RootState) => state.todos
  //   );
  //   const [todo, setTodo] = useState("");
  //   useEffect(() => {
  //     if (fetchError) {
  //       return toaster.danger("Error fetching initial data", {
  //         duration: 4,
  //       });
  //     }
  //     dispatch(fetchInitData());
  //     // eslint-disable-next-line
  //   }, [fetchError]);
  //   const handleAddTodo = () => todo.trim() && dispatch(addTodo(todo));
  //   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>
  //     setTodo(e.target.value);
  //   return (
  //     <div className={styles.container}>
  //       <h1>Todos</h1>
  //       <div className={styles.input}>
  //         <p>Todo</p>
  //         <TextInput
  //           value={todo}
  //           placeholder="Add Todo..."
  //           onChange={handleInputChange}
  //           onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
  //             if (event.key === "Enter") handleAddTodo();
  //           }}
  //         />
  //         <button onClick={handleAddTodo}>+</button>
  //       </div>
  //       <RadioButtons />
  //       {loading ? (
  //         <Spinner
  //           display="flex"
  //           alignItems="center"
  //           justifyContent="center"
  //           size={24}
  //         />
  //       ) : (
  //         todos
  //           .filter((todo) => visibleTodos.includes(todo.id))
  //           .map((todo) => <Todo todo={todo} key={todo.id} />)
  //       )}
  //     </div>
  //   );
};

export default Todos;
