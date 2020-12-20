import { createAction, createReducer } from "@reduxjs/toolkit";

// Type definitions ----------------
export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export enum visibleType {
  show_all = "show_all",
  show_completed = "show_completed",
  show_pending = "show_pending",
}

interface TodoState {
  todos: Todo[];
  visibleTodos: number[];
  visibility: visibleType;
}

// Initial State ----------------
const initialState: TodoState = {
  todos: [],
  visibleTodos: [],
  visibility: visibleType.show_all,
};

// Action creators ----------------
export const addTodo = createAction<Todo["text"]>("todos/addTodo");
export const toggleTodo = createAction<number>("todos/toggleTodo");
export const showAll = createAction("todos/showAll");
export const showCompleted = createAction("todos/showCompleted");
export const showPending = createAction("todos/showPending");

// Reducer ----------------
const todoReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(addTodo, (state, action) => {
      const id = state.todos.length + 1;
      state.todos.push({ id, text: action.payload, completed: false });
      if (state.visibility !== visibleType.show_completed)
        state.visibleTodos.push(id);
    })
    .addCase(toggleTodo, (state, action) => {
      const todo = state.todos.find((todo) => todo.id === action.payload);
      if (todo) todo.completed = !todo.completed;
    })
    .addCase(showAll, (state) => {
      state.visibleTodos = state.todos.map((todo) => todo.id);
      state.visibility = visibleType.show_all;
    })
    .addCase(showCompleted, (state) => {
      state.visibleTodos = state.todos
        .filter((todo) => todo.completed)
        .map((todo) => todo.id);
      state.visibility = visibleType.show_completed;
    })
    .addCase(showPending, (state) => {
      state.visibleTodos = state.todos
        .filter((todo) => !todo.completed)
        .map((todo) => todo.id);
      state.visibility = visibleType.show_pending;
    })
    .addDefaultCase((state) => state);
});

export default todoReducer;
