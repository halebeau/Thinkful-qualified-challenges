import React from "react";

import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import App from "../src/App";
import Holiday from "../src/Holiday";

describe("Test App.js", () => {
  test("Holiday renders correctly", () => {
    
    render(
      <Holiday name="Valentine's Day" day="14" month="February"/>
    );
    expect(screen.getByText("Valentine's Day: February 14")).toBeInTheDocument();

    render(
      <Holiday name="Christmas" day="25" month="December"/>
    );
    expect(screen.getByText("Christmas: December 25")).toBeInTheDocument();

  });
  test("App displays the two Holidays", () => {
    render(<App/>);
    expect(screen.getByText("Valentine's Day: February 14")).toBeInTheDocument();
    expect(screen.getByText("Christmas: December 25")).toBeInTheDocument();  
  });
});
