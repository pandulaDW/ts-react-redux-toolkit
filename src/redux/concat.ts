import { createAction, createAsyncThunk, createReducer } from "@reduxjs/toolkit";
import { ConcatState, ConcatFileTypes } from "../models/concatTypes";

const initialState: ConcatState = {
  fileType: ConcatFileTypes.rr,
};

export const setFileType = createAction<ConcatFileTypes>("scrape/setFileType");

const concatReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(setFileType, (state, action) => {
      state.fileType = action.payload;
    })
    .addDefaultCase((state) => state);
});

export default concatReducer;
