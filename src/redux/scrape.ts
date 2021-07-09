import { AxiosError } from "axios";
import { createAction, createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import {
  FilterState,
  ScrapeState,
  DataView,
  ValidationResponse,
} from "../models/scrapeTypes";
import { FilterTableCols, SortTableCol } from "../models/flexTypes";
import { APIErrorResponse } from "../models/generalTypes";
import { fetchScrapeInitData, fetchScrapeRequestData } from "../helpers/apiCalls";
import { fetchScrapeRequests } from "../helpers/scrapeUtils";
import { toast } from "../components/Common/toast";
import { RootState } from "./_store";

// initial state --------------
const initialState: ScrapeState = {
  ScrapeData: [],
  timestamp: 0,
  filteredByView: [],
  filteredByRA: [],
  uniqueRAs: [],
  fieldList: [],
  filterTableCols: {},
  sortTableCol: {},
  expand: true,
  dataView: DataView.single,
  filterState: FilterState.all,
  loading: false,
  ErrorMsg: null,
  fileDetails: {
    kfids: [],
    numRecords: 0,
  },
};

// Action creators -----------------------------------
export const expandAction = createAction("scrape/expand");
export const setFileDetails = createAction<ValidationResponse>("scrape/setFileDetails");
export const setDataView = createAction("scrape/setDataView");
export const selectRaAction = createAction<string>("scrape/selectRA");
export const setLocalFinished = createAction<string>("scrape/setLocalFinish");
export const setLocalProgress = createAction<string>("scrape/setLocalProgress");
export const setFilterTableCol = createAction<FilterTableCols>("scrape/filterTableCols");
export const setFilterState = createAction<FilterState>("scrape/setFilterState");
export const setSortState = createAction<SortTableCol>("scrape/setSortState");
export const clearAllState = createAction("scrape/clearAllState");

// Thunk action creators -------------------------------
export const fetchScrapeData = createAsyncThunk(
  "scrape/fetchScrapeData",
  async (args: { isInitial: boolean; file: File | null }, thunkAPI) => {
    const { dispatch } = thunkAPI;
    const { isInitial, file } = args;

    try {
      if (isInitial) {
        const response = await fetchScrapeInitData();
        const { data, timestamp, fieldList } = response.data;
        return { data, timestamp, fieldList };
      }

      const timestamp = Date.now();
      const { data } = await fetchScrapeRequests(file as File, timestamp, dispatch);
      dispatch(clearAllState());
      return { data, timestamp };
    } catch (err) {
      const error = err as AxiosError<APIErrorResponse>;
      return thunkAPI.rejectWithValue(error.response?.data.errMessage);
    }
  }
);

export const fetchOnlyData = createAsyncThunk(
  "scrape/fetchDataOnly",
  async (_, { getState }) => {
    const { timestamp } = (getState() as RootState).scrape;
    const response = await fetchScrapeRequestData(timestamp);
    return { data: response.data.data };
  }
);

// Reducer -------------------------------------------
const scrapeReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setFileDetails, (state, action) => {
      state.fileDetails.kfids = action.payload.kfids;
      state.fileDetails.numRecords = action.payload.numRecords;
    })
    .addCase(fetchScrapeData.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchScrapeData.fulfilled, (state, action) => {
      state.loading = false;
      state.ErrorMsg = null;
      const { data: Items, timestamp } = action.payload;
      Items.forEach((item) => {
        item.finished = false;
        item.onProgress = false;
      });
      state.ScrapeData = Items;
      state.timestamp = timestamp;
      state.filteredByView = Items.map((item) => item.kfid);
      state.filteredByRA = Items.map((item) => item.kfid);
      if (action.payload.fieldList) state.fieldList = action.payload.fieldList;
      state.uniqueRAs = Array.from(new Set(Items.map((item) => item.ra_id)));
    })
    .addCase(fetchScrapeData.rejected, (state, action) => {
      state.loading = false;
      state.ErrorMsg = action.payload as string;
      toast(state.ErrorMsg, "error");
    })
    .addCase(fetchOnlyData.fulfilled, (state, action) => {
      const { data: Items } = action.payload;
      Items.forEach((item) => {
        item.finished = false;
        item.onProgress = false;
      });
      state.ScrapeData = Items;
      state.filteredByView = Items.map((item) => item.kfid);
      state.filteredByRA = Items.map((item) => item.kfid);
      state.uniqueRAs = Array.from(new Set(Items.map((item) => item.ra_id)));
    })
    .addCase(expandAction, (state) => {
      state.expand = !state.expand;
    })
    .addCase(selectRaAction, (state, action) => {
      if (action.payload === "all")
        state.filteredByRA = state.ScrapeData.map((el) => el.kfid);
      else
        state.filteredByRA = state.ScrapeData.filter(
          (el) => el.ra_id === action.payload
        ).map((el) => el.kfid);
    })
    .addCase(setLocalFinished, (state, action) => {
      const item = state.ScrapeData.find((el) => el.kfid === action.payload);
      if (item) {
        item.onProgress = false;
        item.finished = !item.finished;
      }
    })
    .addCase(setLocalProgress, (state, action) => {
      const item = state.ScrapeData.find((el) => el.kfid === action.payload);
      if (item) {
        item.finished = false;
        item.onProgress = !item.onProgress;
      }
    })
    .addCase(setFilterState, (state, action) => {
      const filterState = action.payload;
      state.filterState = filterState;
      if (filterState === FilterState.all)
        state.filteredByView = state.ScrapeData.map((el) => el.kfid);
      if (filterState === FilterState.finished)
        state.filteredByView = state.ScrapeData.filter((el) => el.finished).map(
          (el) => el.kfid
        );
      if (filterState === FilterState.progress)
        state.filteredByView = state.ScrapeData.filter((el) => el.onProgress).map(
          (el) => el.kfid
        );
    })
    .addCase(setDataView, (state) => {
      state.dataView =
        state.dataView === DataView.single ? DataView.table : DataView.single;
    })
    .addCase(setFilterTableCol, (state, action) => {
      if (Object.values(action.payload)[0] === "")
        delete state.filterTableCols[Object.keys(action.payload)[0]];
      else state.filterTableCols = { ...state.filterTableCols, ...action.payload };
    })
    .addCase(setSortState, (state, action) => {
      if (action.payload.column) state.sortTableCol = action.payload;
    })
    .addCase(clearAllState, (state) => {
      const { fieldList, fileDetails } = state;
      state = Object.assign(state, initialState);
      state.fieldList = fieldList;
      state.fileDetails = fileDetails;
    })
    .addDefaultCase((state) => state);
});

export default scrapeReducer;
