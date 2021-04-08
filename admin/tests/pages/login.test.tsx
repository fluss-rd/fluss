import "@testing-library/jest-dom/extend-expect";

import { render } from "@testing-library/react";

import Login from "../../src/pages";

test("Check for Getting Started Text", () => {
  const { getByText } = render(<Login />);
  expect(getByText("Inicio de sesion")).toBeInTheDocument();
});
