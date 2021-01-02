import {
  createAction,
  createAsyncThunk,
  createReducer,
} from "@reduxjs/toolkit";
import {
  ScrapeDataResponseType,
  FilterState,
  ScrapeState,
  DataView,
} from "../models/scrapeTypes";
import { FilterTableCols } from "../models/flexTypes";
import { fetchInitCall } from "../helpers/apiCalls";

// initial state --------------
const initialState: ScrapeState = {
  ScrapeData: [],
  timestamp: 0,
  filteredByView: [],
  filteredByRA: [],
  uniqueRAs: [],
  fieldList: [],
  filterTableCols: {},
  expand: true,
  dataView: DataView.single,
  filterState: FilterState.all,
  loading: false,
  ErrorMsg: null,
};

// Action creators -----------------------------------
export const expandAction = createAction("scrape/expand");
export const setDataView = createAction("scrape/setDataView");
export const selectRaAction = createAction<string>("scrape/selectRA");
export const setLocalFinished = createAction<string>("scrape/setLocalFinish");
export const setLocalProgress = createAction<string>("scrape/setLocalProgress");
export const setFilterTableCol = createAction<FilterTableCols>(
  "scrape/filterTableCols"
);
export const setFilterState = createAction<FilterState>(
  "scrape/setFilterState"
);

// Thunk action creators -------------------------------
export const fetchInitData = createAsyncThunk(
  "scrape/fetchInitData",
  async (arg, thunkAPI) => {
    try {
      const response = await fetchInitCall();
      return response.data as ScrapeDataResponseType;
    } catch (err) {
      return thunkAPI.rejectWithValue("Error fetching initial data");
    }
  }
);

// Reducer -------------------------------------------
const scrapeReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchInitData.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchInitData.fulfilled, (state, action) => {
      state.loading = false;
      state.ErrorMsg = null;
      const { Items } = action.payload;
      Items.forEach((item) => {
        item.finished = false;
        item.onProgress = false;
      });
      state.ScrapeData = Items;
      state.timestamp = Items[0]["timestamp"];
      state.filteredByView = Items.map((item) => item.kfid);
      state.filteredByRA = Items.map((item) => item.kfid);
      state.fieldList = action.payload.fieldList;
      state.uniqueRAs = Array.from(new Set(Items.map((item) => item.RAId)));
    })
    .addCase(fetchInitData.rejected, (state, action) => {
      state.loading = false;
      state.ErrorMsg = action.payload as string;
    })
    .addCase(expandAction, (state) => {
      state.expand = !state.expand;
    })
    .addCase(selectRaAction, (state, action) => {
      if (action.payload === "all")
        state.filteredByRA = state.ScrapeData.map((el) => el.kfid);
      else
        state.filteredByRA = state.ScrapeData.filter(
          (el) => el.RAId === action.payload
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
        state.filteredByView = state.ScrapeData.filter(
          (el) => el.onProgress
        ).map((el) => el.kfid);
    })
    .addCase(setDataView, (state) => {
      state.dataView =
        state.dataView === DataView.single ? DataView.table : DataView.single;
    })
    .addCase(setFilterTableCol, (state, action) => {
      if (Object.values(action.payload)[0] === undefined)
        delete state.filterTableCols[Object.keys(action.payload)[0]];
      else
        state.filterTableCols = { ...state.filterTableCols, ...action.payload };
    })
    .addDefaultCase((state) => state);
});

export default scrapeReducer;
