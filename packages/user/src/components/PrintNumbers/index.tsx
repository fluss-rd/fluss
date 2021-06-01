import React, { FC } from "react";

interface PrintNumbersProps {
  numbers: number[];
}

const PrintNumbers: FC<PrintNumbersProps> = (props) => {
  return (
    <div>
      {props.numbers.map((number, i) => (
        <span key={i} style={{ display: "block" }}>
          {number}
        </span>
      ))}
    </div>
  );
};

export default PrintNumbers;
