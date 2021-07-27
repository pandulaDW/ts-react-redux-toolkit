import { createAction, createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { ConcatState, ConcatFileTypes } from "../models/concatTypes";
import { fetchConcatData } from "../helpers/apiCalls";
import { RootState } from "./_store";

const initialState: ConcatState = {
  fileType: ConcatFileTypes.rr,
  value: "",
  data: [],
};

export const setFileType = createAction<ConcatFileTypes>("concat/setFileType");
export const setValue = createAction<string>("concat/setValue");

export const fetchData = createAsyncThunk("concat/fetchData", async (_, { getState }) => {
  const { fileType, value } = (getState() as RootState).concat;
  const response = await fetchConcatData({ fileType, value });
  return { data: response.data.records };
});

const concatReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setFileType, (state, action) => {
      state.fileType = action.payload;
    })
    .addCase(setValue, (state, action) => {
      state.value = action.payload;
    })
    .addCase(fetchData.fulfilled, (state, action) => {
      state.data = action.payload.data;
    })
    .addDefaultCase((state) => state);
});

export default concatReducer;
