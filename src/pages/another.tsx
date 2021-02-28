import React, { FC } from "react";
import router from "next/router";

const Another: FC = () => {
  return (
    <>
      <h1>Another</h1>
      <button onClick={() => router.push("/")}>To Home</button>
    </>
  );
};

export default Another;
