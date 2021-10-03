import React from "react";
import {render, fireEvent, screen} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import CountButton from "../src/CountButton";

describe("Test CountButton", () => {

  beforeEach(() => {
    render(<CountButton />);
  });
  
  test("initial text", () => {
    expect(screen.getByText("Click Count: 0")).toBeInTheDocument();
  });
  
  test("text after one click", () => {
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByText("Click Count: 1")).toBeInTheDocument();
  });
  
  test("text after two clicks", () => {
    fireEvent.click(screen.getByRole("button"));
    fireEvent.click(screen.getByRole("button"));
    expect(screen.getByText("Click Count: 2")).toBeInTheDocument();  
  });

});