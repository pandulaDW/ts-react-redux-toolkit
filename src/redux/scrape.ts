import {
  createAction,
  createAsyncThunk,
  createReducer,
} from "@reduxjs/toolkit";
import { ScrapeDataType, ScrapeDataResponseType } from "../models/scrapeTypes";
import { fetchInitCall } from "../helpers/apiCalls";

// UI type defs -----------------
type DataView = "single" | "table";
type FilterState = "all" | "progress" | "finished";

// state definition --------------
interface ScrapeState {
  ScrapeData: ScrapeDataType[];
  filteredIDs: string[];
  fieldList: string[];
  expand: boolean;
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
  expand: true,
  dataView: "single",
  filterState: "all",
  loading: false,
  ErrorMsg: null,
};

// Action creators -------------------
export const expandAction = createAction("scrape/expand");

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
      state.filteredIDs = action.payload.Items.map((item) => item.kfid);
      state.fieldList = action.payload.fieldList;
    })
    .addCase(fetchInitData.rejected, (state, action) => {
      state.loading = false;
      state.ErrorMsg = action.payload as string;
    })
    .addCase(expandAction, (state) => {
      state.expand = !state.expand;
    })
    .addDefaultCase((state) => state);
});

export default scrapeReducer;
