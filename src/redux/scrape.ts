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
  filteredByView: string[];
  filteredByRA: string[];
  uniqueRAs: string[];
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
  filteredByView: [],
  filteredByRA: [],
  uniqueRAs: [],
  fieldList: [],
  expand: true,
  dataView: "single",
  filterState: "all",
  loading: false,
  ErrorMsg: null,
};

// Action creators -----------------------------------
export const expandAction = createAction("scrape/expand");
export const selectRaAction = createAction<string>("scrape/selectRA");

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
      state.ScrapeData = Items;
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
    .addDefaultCase((state) => state);
});

export default scrapeReducer;
