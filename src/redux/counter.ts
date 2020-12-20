import { createAction, createReducer } from "@reduxjs/toolkit";

interface CounterState {
  count: number;
}

export const increment = createAction("counter/increment");
export const decrement = createAction("counter/decrement");
export const incrementByAmount = createAction<number>(
  "counter/incrementByAmount"
);

const initialState: CounterState = {
  count: 0,
};

const countReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(increment, (state) => {
      state.count++;
    })
    .addCase(decrement, (state) => {
      state.count--;
    })
    .addCase(incrementByAmount, (state, action) => {
      state.count += action.payload;
    })
    .addDefaultCase((state) => state);
});

export default countReducer;
