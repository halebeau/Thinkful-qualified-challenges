import React from "react";
import ReactDOM from "react-dom";

import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import App from "../src/App";

describe("Test App.js", () => {
  test("App renders correctly", () => {
    render(<App />);
    expect(screen.getByText("Hello World!")).toBeInTheDocument();
  });
});