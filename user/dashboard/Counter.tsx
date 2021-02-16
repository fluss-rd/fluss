import { useState } from "react";

function Counter() {
  const [counter, setCounter] = useState(0);
  const incrementCount = () => setCounter(counter + 1);

  return (
    <div>
      <p>{counter}</p>
      <button onClick={incrementCount}>Increment</button>
    </div>
  )
}
