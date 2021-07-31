import { createAction, createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { DQState, DQView, DQRequestBody, FilterTableCols } from "../models/dqTypes";
import { fetchDQData } from "../helpers/apiCalls";

const initialState: DQState = {
  data: [],
  timestamp: undefined,
  kfids: [],
  selectedKfid: undefined,
  view: "TableView",
  loading: false,
  filterTableCols: {},
  isInitialState: true,
};

export const populateKfids = createAction<string[]>("dq/populateKfids");
export const setView = createAction<DQView>("dq/setView");
export const setKfid = createAction<string | undefined>("dq/setKfid");
export const clearAll = createAction("dq/clearAll");
export const setFilterTableCol = createAction<FilterTableCols>("dq/filterTableCols");

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
      state = Object.assign(state, initialState);
      state.data = action.payload.data;
      state.timestamp = action.payload.timestamp;
      state.isInitialState = false;
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
    .addCase(setFilterTableCol, (state, action) => {
      if (Object.values(action.payload)[0] === "")
        delete state.filterTableCols[Object.keys(action.payload)[0]];
      else state.filterTableCols = { ...state.filterTableCols, ...action.payload };
    })
    .addCase(clearAll, (state) => {
      state = Object.assign(state, initialState);
    })
    .addDefaultCase((state) => state);
});

export default dqReducer;
