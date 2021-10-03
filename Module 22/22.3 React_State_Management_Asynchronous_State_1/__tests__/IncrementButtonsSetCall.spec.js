import React, { useState } from "react";
import {render, fireEvent, screen} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import IncrementButtons from "../src/IncrementButtons";

jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
}));

const setState = jest.fn();
const useStateMock = (initialState) => [initialState, setState];
jest.spyOn(React, 'useState').mockImplementation(useStateMock);

describe("Test IncrementButtons setCount Calls", () => {
  
  beforeEach(() => {    
    render(<IncrementButtons/>);
  });

  afterEach(() => {
     jest.clearAllMocks();
  });
    
  test("calls setCount() twice after clicking button Two", () => {    
    fireEvent.click(screen.getByRole("button", {name: /Two/i}));
    expect(setState).toHaveBeenCalledTimes(3);
    expect(setState).toHaveBeenCalledWith("Two");
  });


});
