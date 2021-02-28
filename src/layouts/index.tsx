import React, { FC, useState } from "react";

const Layout: FC = ({ children }) => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Layout: {count}</h1>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <div>{children}</div>
    </div>
  );
};

export default Layout;

