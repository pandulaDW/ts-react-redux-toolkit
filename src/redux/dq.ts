import { createAction, createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { DQState, DQView, DQRequestBody } from "../models/dqTypes";
import { fetchDQData } from "../helpers/apiCalls";

const initialState: DQState = {
  data: [],
  timestamp: undefined,
  kfids: [],
  selectedKfid: undefined,
  view: "TableView",
  loading: false,
};

export const populateKfids = createAction<string[]>("dq/populateKfids");
export const setView = createAction<DQView>("dq/setView");
export const setKfid = createAction<string | undefined>("dq/setKfid");
export const clearAll = createAction("dq/clearAll");

export const fetchData = createAsyncThunk("dq/fetchData", async (args: DQRequestBody) => {
  const response = await fetchDQData(args);
  return { data: response.data.data, timestamp: response.data.timestamp };
});

const dqReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchData.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchData.fulfilled, (state, action) => {
      state.loading = false;
      state.data = action.payload.data;
      state.timestamp = action.payload.timestamp;
    })
    .addCase(populateKfids, (state, action) => {
      state.kfids = action.payload;
    })
    .addCase(setView, (state, action) => {
      state.view = action.payload;
    })
    .addCase(setKfid, (state, action) => {
      state.selectedKfid = action.payload;
    })
    .addCase(clearAll, (state) => {
      state = Object.assign(state, initialState);
    })
    .addDefaultCase((state) => state);
});

export default dqReducer;
