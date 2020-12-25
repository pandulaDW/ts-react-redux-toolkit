import { createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { ScrapeDataType, ScrapeDataResponseType } from "../models/scrapeTypes";
import { fetchInitCall } from "../helpers/apiCalls";

// UI type defs -----------------
type CollapseState = "collapsed" | "expanded";
type DataView = "single" | "table";
type FilterState = "all" | "progress" | "finished";

// state definition --------------
interface ScrapeState {
  ScrapeData: ScrapeDataType[];
  filteredIDs: string[];
  fieldList: string[];
  collapseState: CollapseState;
  dataView: DataView;
  filterState: FilterState;
  loading: boolean;
  ErrorMsg: string | null;
}

// initial state --------------
const initialState: ScrapeState = {
  ScrapeData: [],
  filteredIDs: [],
  fieldList: [],
  collapseState: "expanded",
  dataView: "single",
  filterState: "all",
  loading: true,
  ErrorMsg: null,
};

// Action creators -------------------

// Thunk action creators --------------
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

// Reducer ----------------
const scrapeReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(fetchInitData.pending, (state) => {
      state.loading = true;
    })
    .addCase(fetchInitData.fulfilled, (state, action) => {
      state.loading = false;
      state.ErrorMsg = null;
      state.ScrapeData = action.payload.Items;
      state.fieldList = action.payload.fieldList;
    })
    .addCase(fetchInitData.rejected, (state, action) => {
      state.loading = false;
      state.ErrorMsg = action.error.message as string;
    })
    .addDefaultCase((state) => state);
});

export default scrapeReducer;
