import React, { useState } from "react";
import {render, fireEvent, screen} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import IncrementButtons from "../src/IncrementButtons";

describe("Test IncrementButtons", () => {
  
  beforeEach(() => {    
    render(<IncrementButtons/>);
  });
  
  test("initial text", () => {
    expect(screen.getByRole("heading", {name: /Last Pressed:/i})).toBeInTheDocument();
    expect(screen.getByRole("heading", {name: /Count: 0/i})).toBeInTheDocument();
  });

  test("text after clicking button One", () => {
    fireEvent.click(screen.getByRole("button", {name: /One/i}));
    expect(screen.getByRole("heading", {name: /Last Pressed: One/i})).toBeInTheDocument();
    expect(screen.getByRole("heading", {name: /Count: 1/i})).toBeInTheDocument();
  });

  test("text after clicking button Two", () => {
    fireEvent.click(screen.getByRole("button", {name: /Two/i}));
    expect(screen.getByRole("heading", {name: /Last Pressed: Two/i})).toBeInTheDocument();
    expect(screen.getByRole("heading", {name: /Count: 2/i})).toBeInTheDocument();
  });

  test("text after clicking button One then Two", () => {
    fireEvent.click(screen.getByRole("button", {name: /One/i}));
    fireEvent.click(screen.getByRole("button", {name: /Two/i}));
    expect(screen.getByRole("heading", {name: /Last Pressed: Two/i})).toBeInTheDocument();
    expect(screen.getByRole("heading", {name: /Count: 3/i})).toBeInTheDocument();

  });

  test("text after clicking buttons Two, Two, One", () => {
    fireEvent.click(screen.getByRole("button", {name: /Two/i}));
    fireEvent.click(screen.getByRole("button", {name: /Two/i}));
    fireEvent.click(screen.getByRole("button", {name: /One/i}));
    expect(screen.getByRole("heading", {name: /Last Pressed: One/i})).toBeInTheDocument();
    expect(screen.getByRole("heading", {name: /Count: 5/i})).toBeInTheDocument();
  });
});
