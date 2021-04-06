import { FC } from "react";

interface AnotherProps {
  onClick: () => void;
}

const Another: FC<AnotherProps> = ({ onClick }) => (
  <button onClick={onClick}>Hey :O</button>
);

export default Another;

