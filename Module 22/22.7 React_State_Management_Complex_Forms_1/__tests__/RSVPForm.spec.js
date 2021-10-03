import React from "react";
import {render, fireEvent, screen} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import RSVPForm from "../src/RSVPForm";

describe("Test RSVPForm", () => {
 
  beforeEach(() => {
    render (<RSVPForm/>);
    console.log = jest.fn();
  });
  
  test("Has correct fields", () => {
    expect(screen.queryAllByRole("textbox")).toHaveLength(2);
    expect(screen.queryAllByRole("checkbox")).toHaveLength(1);
    expect(screen.queryAllByRole("combobox")).toHaveLength(1);
  });
  
  test("Submission", () => {
    fireEvent.change(screen.queryAllByRole("textbox")[0], {target: {value: 'John'}});
    const combobox = screen.getByRole("combobox");
    fireEvent.click(screen.getByText("Prefer not to say"));
    fireEvent.click(screen.getByRole("checkbox"));
    fireEvent.submit(screen.getByRole("button").closest("form"));
    expect(console.log.mock.calls.length).toEqual(1);
    expect(console.log).toBeCalledWith("John", "", true, "");    
  });

  test("Initial checkbox value is false", () => {
    fireEvent.change(screen.queryAllByRole("textbox")[0], {target: {value: 'John'}});
    fireEvent.submit(screen.getByRole("button").closest("form"));
    expect(console.log.mock.calls[0][2]).toEqual(false);
  });
  
  test("Initial dropdown value is valid", () => {
    const combobox = screen.getByRole("combobox");
    expect(combobox).toBeInTheDocument();
    expect(screen.getByText("Prefer not to say")).toBeInTheDocument();
    expect(screen.getByText("0-19")).toBeInTheDocument();
    expect(screen.getByText("20-39")).toBeInTheDocument();
    expect(screen.getByText("40-59")).toBeInTheDocument();
    expect(screen.getByText("60+")).toBeInTheDocument();    
  });

  test("Fields cleared after submission", () => {
    fireEvent.change(screen.queryAllByRole("textbox")[0], {target: {value: 'John'}});
    fireEvent.submit(screen.getByRole("button").closest("form"));
    fireEvent.submit(screen.getByRole("button").closest("form"));
    expect(console.log.mock.calls.length).toEqual(2);
    expect(console.log).toBeCalledWith("", "", false, "");
  });
});
