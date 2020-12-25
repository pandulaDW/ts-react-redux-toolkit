import { configureStore, combineReducers } from "@reduxjs/toolkit";
import scrapeReducer from "./scrape";

const rootReducer = combineReducers({
  scrape: scrapeReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = configureStore({
  reducer: rootReducer,
});

export default store;
