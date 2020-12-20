import { configureStore, combineReducers } from "@reduxjs/toolkit";
import countReducer from "./counter";

const rootReducer = combineReducers({
  counter: countReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export default store;
