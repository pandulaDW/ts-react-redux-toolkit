import { configureStore, combineReducers } from "@reduxjs/toolkit";
import countReducer from "./counter";
import todoReducer from "./todos";

const rootReducer = combineReducers({
  counter: countReducer,
  todos: todoReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export default store;
