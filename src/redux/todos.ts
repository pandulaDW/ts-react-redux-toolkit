import { createAction, createReducer } from "@reduxjs/toolkit";

// Type definitions
interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
}

// Initial State
const initialState: TodoState = { todos: [] };

// Action creators
export const addTodo = createAction<Todo>("todos/addTodo");
export const toggleTodo = createAction<number>("todos/toggleTodo");

// Reducer
const todoReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addTodo, (state, action) => {
      const { id, text } = action.payload;
      state.todos.push({ id, text, completed: false });
    })
    .addCase(toggleTodo, (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    })
    .addDefaultCase((state) => state);
});

export default todoReducer;
