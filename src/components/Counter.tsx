import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { TextInput } from "evergreen-ui";

import { RootState } from "../redux/_store";
import { increment, decrement, incrementByAmount } from "../redux/counter";
import styles from "../styles/counter.module.scss";

const Counter = () => {
  const dispatch = useDispatch();
  const [incAmount, setIncAmount] = React.useState(1);
  const { count } = useSelector((state: RootState) => state.counter);

  const handleIncrement = () => dispatch(increment());
  const handleDecrement = () => dispatch(decrement());
  const handleIncrementByAmount = () => dispatch(incrementByAmount(incAmount));
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (isNaN(value)) setIncAmount(0);
    else setIncAmount(value);
  };

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
        <TextInput value={incAmount} onChange={handleInputChange} />
      </div>
      <div className={styles.buttons}>
        <button onClick={handleIncrement}>Increment</button>
        <button onClick={handleIncrementByAmount}>Increment By Amount</button>
        <button onClick={handleDecrement}>Decrement</button>
      </div>
    </div>
  );
};

export default Counter;
