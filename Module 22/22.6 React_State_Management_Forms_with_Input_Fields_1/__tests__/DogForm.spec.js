import React from "react";
import {render, fireEvent, screen} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import DogForm from "../src/DogForm";

describe("Test DogForm", () => {

  beforeEach(() => {
    console.log = jest.fn();
    render(<DogForm />);
  });
    
  test("preventDefault is called", () => {
    const event = {
      preventDefault: () => {},
    };
    jest.spyOn(event, "preventDefault");
    const isPrevented = fireEvent.submit(screen.getByRole("button").closest("form"));
    expect(isPrevented).toBe(false);
  });

  test("has required fields", () => {
    expect(screen.queryAllByRole("textbox")).toHaveLength(3);
  });

  test("test one input", () => {
    fireEvent.change(screen.queryAllByRole("textbox")[0], {target: {value: 'Rufus'}})
    fireEvent.change(screen.queryAllByRole("textbox")[1], {target: {value: 'pit bull'}})
    fireEvent.change(screen.queryAllByRole("textbox")[2], {target: {value: '2'}})
    fireEvent.submit(screen.getByRole("button").closest("form"));
    expect(console.log).toBeCalledWith("Rufus", "pit bull", "2");
  });

  test("test fields cleared", () => {
    fireEvent.change(screen.queryAllByRole("textbox")[0], {target: {value: 'Rufus'}})
    fireEvent.change(screen.queryAllByRole("textbox")[1], {target: {value: 'pit bull'}})
    fireEvent.change(screen.queryAllByRole("textbox")[2], {target: {value: '2'}})
    fireEvent.submit(screen.getByRole("button").closest("form"));
    fireEvent.change(screen.queryAllByRole("textbox")[0], {target: {value: 'Bingo'}})
    fireEvent.submit(screen.getByRole("button").closest("form"));
    expect(console.log).toBeCalledWith("Bingo", "", "");
  });
  
  test("test input value is set", () => {
    fireEvent.change(screen.queryAllByRole("textbox")[0], {target: {value: 'Rufus'}})
    fireEvent.change(screen.queryAllByRole("textbox")[1], {target: {value: 'pit bull'}})
    fireEvent.change(screen.queryAllByRole("textbox")[2], {target: {value: '2'}})
    expect(screen.queryAllByRole("textbox")[0]).toHaveAttribute("value", "Rufus");
    expect(screen.queryAllByRole("textbox")[1]).toHaveAttribute("value", "pit bull");
    expect(screen.queryAllByRole("textbox")[2]).toHaveAttribute("value", "2");
  });
});
