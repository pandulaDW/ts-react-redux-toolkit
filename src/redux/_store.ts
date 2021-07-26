import { configureStore, combineReducers } from "@reduxjs/toolkit";
import scrapeReducer from "./scrape";
import concatReducer from "./concat";

const rootReducer = combineReducers({
  scrape: scrapeReducer,
  concat: concatReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export default store;
