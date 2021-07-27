import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { DQState, DQRequestBody } from "../models/dqTypes";
import { fetchDQData } from "../helpers/apiCalls";

const initialState: DQState = {
  data: [],
  timestamp: undefined,
};

export const fetchData = createAsyncThunk(
  "scrape/fetchData",
  async (args: DQRequestBody) => {
    const response = await fetchDQData(args);
    return { data: response.data.data, timestamp: response.data.timestamp };
  }
);

const concatReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.timestamp = action.payload.timestamp;
    })
    .addDefaultCase((state) => state);
});

export default concatReducer;
