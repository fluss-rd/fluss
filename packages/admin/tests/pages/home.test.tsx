import "@testing-library/jest-dom/extend-expect";

import { render } from "@testing-library/react";

import Home from "../../src/pages";

test("Check for Getting Started Text", () => {
  const { getByText } = render(<Home />);
  expect(getByText("Hello, world : D!")).toBeInTheDocument();
});
