import { createAction, createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { DQState, DQRequestBody } from "../models/dqTypes";
import { fetchDQData } from "../helpers/apiCalls";

const initialState: DQState = {
  data: [],
  timestamp: undefined,
  kfids: [],
};

export const populateKfids = createAction<string[]>("dq/populateKfids");

export const fetchData = createAsyncThunk("dq/fetchData", async (args: DQRequestBody) => {
  const response = await fetchDQData(args);
  return { data: response.data.data, timestamp: response.data.timestamp };
});

const dqReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.data;
      state.timestamp = action.payload.timestamp;
    })
    .addCase(populateKfids, (state, action) => {
      state.kfids = action.payload;
    })
    .addDefaultCase((state) => state);
});

export default dqReducer;
