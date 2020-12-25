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
}

// initial state --------------
const initialState: ScrapeState = {
  ScrapeData: [],
  filteredIDs: [],
  fieldList: [],
  collapseState: "expanded",
  dataView: "single",
  filterState: "all",
};

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
const scrapeReducer = createReducer(initialState, (builder) => {});

export default scrapeReducer;
