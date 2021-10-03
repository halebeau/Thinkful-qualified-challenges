import React from "react";
import {render, fireEvent, screen} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import App from "../src/App";

describe("Test App", () => {

  beforeEach(() => {
    render(<App/>);
    fireEvent.click(screen.getByRole("button", {name: /Log In/i}));
  });

  test("initial page", () => {
    expect(screen.getByText("CONTENT")).toBeInTheDocument();
    expect(screen.getByText("CONTENT").closest("p")).toHaveStyle({'font-size': '12px'});
  });

  test("two buttons", () => {
    expect(screen.queryAllByRole("button")).toHaveLength(2);
  });

  test("font increase once", () => {
    fireEvent.click(screen.getByRole("button", {name: /Increase Font size/i}));
    expect(screen.getByText("CONTENT")).toBeInTheDocument();
    expect(screen.getByText("CONTENT").closest("p")).toHaveStyle({'font-size': '14px'});
  });

  test("font increase twice", () => {
    fireEvent.click(screen.getByRole("button", {name: /Increase Font size/i}));
    fireEvent.click(screen.getByRole("button", {name: /Increase Font size/i}));
    expect(screen.getByText("CONTENT")).toBeInTheDocument();
    expect(screen.getByText("CONTENT").closest("p")).toHaveStyle({'font-size': '16px'});
  });

});
