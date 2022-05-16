import { useState } from "react";
import Button from "./components/Button";
import Statistics from "./components/Statistics";

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const incrementGood = () => {
    setGood((good) => good + 1);
  };

  const incrementNeutral = () => {
    setNeutral((Neutral) => Neutral + 1);
  };

  const incrementBad = () => {
    setBad((Bad) => Bad + 1);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button clickHandler={incrementGood} text={"good"} />
      <Button clickHandler={incrementNeutral} text={"neutral"} />
      <Button clickHandler={incrementBad} text={"bad"} />
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  );
};

export default App;
