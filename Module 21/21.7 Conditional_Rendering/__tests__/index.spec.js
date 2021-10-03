import React from "react";
import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import App from "../src/App";
import Clock from "../src/Clock";

// test using Jest with default jsdom environment
describe("Test App.jsx", () => {
  let realDate;
  let realDateNow;
  beforeEach(() => {
    realDate = Date;
    realDateNow = Date.now;
  });
  afterEach(() => {
    global.Date = realDate;
    global.Date.now = realDateNow;
  });
  const mockTime = (hours, minutes) => {
    const [year, month, day] = [2020, 1, 1];
    const fakeDate = new Date(year, month, day, hours, minutes);
    global.Date = class extends Date {
      constructor (date) {
        return date ? super(date) : fakeDate;
      }
    };
    Date.now = jest.fn(() => fakeDate.valueOf());
  };
  test("Clock morning", () => {
    mockTime(10, 0);
    render(<Clock/>);
    expect(screen.getByText("Good Morning!")).toBeInTheDocument();
  });
  test("Clock afternoon", () => {
    mockTime(14, 0);
    render(<Clock/>);
    expect(screen.getByText("Good Afternoon!")).toBeInTheDocument();
  });
  test("Clock evening", () => {
    mockTime(21, 0);
    render(<Clock/>);
    expect(screen.getByText("Good Evening!")).toBeInTheDocument();
  });
  test("App logged out", () => {
    render(<App loggedIn={false}/>);
    expect(screen.queryByText(/Good \w+!/)).toEqual(null);
  });
  test("App logged in & render", () => {
    render(<App loggedIn={true}/>);
    expect(screen.getByText(/Good \w+!/)).toBeInTheDocument();
  });
});
