import React from "react";
import { useDispatch, useSelector } from "react-redux";

import { RootState } from "../redux/_store";
import { increment, decrement, incrementByAmount } from "../redux/counter";
import styles from "../styles/counter.module.scss";

const Counter = () => {
  const [incAmount, setIncAmount] = React.useState(1);

  const dispatch = useDispatch();
  const { count } = useSelector((state: RootState) => state.counter);

  return (
    <div className={styles.container}>
      <h1>
        Count is set to - <span>{count}</span>
      </h1>
      <div className={styles.input}>
        <p>
          Increment
          <br /> Amount
        </p>
        <input
          type="text"
          value={incAmount}
          onChange={(e) => setIncAmount(parseInt(e.target.value))}
        />
      </div>
      <div className={styles.buttons}>
        <button onClick={() => dispatch(increment())}>Increment</button>
        <button onClick={() => dispatch(incrementByAmount(incAmount))}>
          Increment By Amount
        </button>
        <button onClick={() => dispatch(decrement())}>Decrement</button>
      </div>
    </div>
  );
};

export default Counter;
