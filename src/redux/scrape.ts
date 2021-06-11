import {
  createAction,
  createAsyncThunk,
  createReducer,
} from "@reduxjs/toolkit";
import { FilterState, ScrapeState, DataView } from "../models/scrapeTypes";
import { FilterTableCols, SortTableCol } from "../models/flexTypes";
import { fetchInitCall } from "../helpers/apiCalls";
import { fetchScrapeRequests } from "../helpers/scrapeUtils";

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
  loadingProgress: 0,
  ErrorMsg: null,
};

// Action creators -----------------------------------
export const expandAction = createAction("scrape/expand");
export const setDataView = createAction("scrape/setDataView");
export const selectRaAction = createAction<string>("scrape/selectRA");
export const setLocalFinished = createAction<string>("scrape/setLocalFinish");
export const setLocalProgress = createAction<string>("scrape/setLocalProgress");
export const setLoadingProgress = createAction<number>(
  "scrape/setLoadProgress"
);
export const setFilterTableCol = createAction<FilterTableCols>(
  "scrape/filterTableCols"
);
export const setFilterState = createAction<FilterState>(
  "scrape/setFilterState"
);
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
        const response = await fetchInitCall();
        const { data, timestamp, fieldList } = response.data;
        return { data, timestamp, fieldList };
      }
      const { data, timestamp } = await fetchScrapeRequests(
        dispatch,
        file as File
      );
      dispatch(clearAllState());
      return { data, timestamp };
    } catch (err) {
      return thunkAPI.rejectWithValue("Error fetching data");
    }
  }
);

// Reducer -------------------------------------------
const scrapeReducer = createReducer(initialState, (builder) => {
  builder
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
        state.filteredByView = state.ScrapeData.filter(
          (el) => el.onProgress
        ).map((el) => el.kfid);
    })
    .addCase(setDataView, (state) => {
      state.dataView =
        state.dataView === DataView.single ? DataView.table : DataView.single;
    })
    .addCase(setFilterTableCol, (state, action) => {
      if (Object.values(action.payload)[0] === "")
        delete state.filterTableCols[Object.keys(action.payload)[0]];
      else
        state.filterTableCols = { ...state.filterTableCols, ...action.payload };
    })
    .addCase(setSortState, (state, action) => {
      if (action.payload.column) state.sortTableCol = action.payload;
    })
    .addCase(clearAllState, (state) => {
      const { fieldList } = state;
      state = Object.assign(state, initialState);
      state.fieldList = fieldList;
    })
    .addCase(setLoadingProgress, (state, action) => {
      state.loadingProgress = action.payload * 100;
    })
    .addDefaultCase((state) => state);
});

export default scrapeReducer;
