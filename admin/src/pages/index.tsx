import { Typography } from "@material-ui/core";
import React from "react";

export default function Home() {
  console.log("hey");
  const lines = [];
  for (let i = 0; i < 50; i++) {
    lines.push(
      <Typography variant="h4" key={i}>
        Hello, world : D!
      </Typography>
    );
  }

  return lines;
}
