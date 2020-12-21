import {
  createAction,
  createReducer,
  createAsyncThunk,
} from "@reduxjs/toolkit";
import axios, { AxiosResponse } from "axios";

// timeout promise
const timeout = (ms: number) => {
  return new Promise((resolve) => window.setTimeout(resolve, ms));
};

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
  loading: boolean;
  fetchError: string | null;
}

// Initial State ----------------
const initialState: TodoState = {
  todos: [],
  visibleTodos: [],
  visibility: visibleType.show_all,
  loading: false,
  fetchError: null,
};

// Action creators ----------------
export const addTodo = createAction<Todo["text"]>("todos/addTodo");
export const toggleTodo = createAction<number>("todos/toggleTodo");
export const showAll = createAction("todos/showAll");
export const showCompleted = createAction("todos/showCompleted");
export const showPending = createAction("todos/showPending");

// Thunk action creators ----------
export const fetchInitData = createAsyncThunk(
  "todos/fetchInitData",
  async (arg, thunkAPI) => {
    try {
      let response: AxiosResponse<Todo[]>;
      response = await axios.get("http://localhost:3001/todos");
      await timeout(1000);
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue("Error fetching initial data");
    }
  }
);

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
    .addCase(fetchInitData.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchInitData.fulfilled, (state, action) => {
      state.loading = false;
      state.todos = action.payload;
      state.visibleTodos = action.payload.map((todo) => todo.id);
    })
    .addCase(fetchInitData.rejected, (state, action) => {
      state.loading = false;
      state.fetchError = action.payload as string;
    })
    .addDefaultCase((state) => state);
});

export default todoReducer;
