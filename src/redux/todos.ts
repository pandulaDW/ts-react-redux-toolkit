import { createAction, createReducer } from "@reduxjs/toolkit";

// Type definitions
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoState {
  todos: Todo[];
  visibleTodos: number[];
}

// Initial State
const initialState: TodoState = { todos: [], visibleTodos: [] };

// Action creators
export const addTodo = createAction<Todo["text"]>("todos/addTodo");
export const toggleTodo = createAction<number>("todos/toggleTodo");
export const showAll = createAction("todos/showAll");
export const showCompleted = createAction("todos/showCompleted");
export const showPending = createAction("todos/showPending");

// Reducer
const todoReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addTodo, (state, action) => {
      const text = action.payload;
      state.todos.push({ id: state.todos.length + 1, text, completed: false });
    })
    .addCase(toggleTodo, (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    })
    .addCase(showAll, (state) => {
      state.visibleTodos = state.todos.map((todo) => todo.id);
    })
    .addDefaultCase((state) => state);
});

export default todoReducer;
