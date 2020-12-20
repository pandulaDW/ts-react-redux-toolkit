import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../redux/_store";
import { increment, decrement, incrementByAmount } from "../redux/counter";

const Counter = () => {
  const [incAmount, setIncAmount] = React.useState(1);

  const dispatch = useDispatch();
  const { count } = useSelector((state: RootState) => state.counter);

  return (
    <div>
      <h1>Count is set to {count}</h1>
      <input
        type="text"
        value={incAmount}
        onChange={(e) => setIncAmount(parseInt(e.target.value))}
      />
      <button onClick={() => dispatch(increment())}>Increment</button>
      <button onClick={() => dispatch(incrementByAmount(incAmount))}>
        Increment By Amount
      </button>
      <button onClick={() => dispatch(decrement())}>Decrement</button>
    </div>
  );
};

export default Counter;
