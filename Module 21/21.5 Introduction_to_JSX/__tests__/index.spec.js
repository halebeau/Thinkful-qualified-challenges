import React from "react";
import ReactDOM from "react-dom";

import {render, fireEvent, waitFor, screen} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import App from '../src/App';

describe("Test App", () => {

  test("content is surrounded by main tag", () => {
    render(<App />);
    expect(screen.getByRole("main")).toBeInTheDocument();
  });  
  
  test("displays 'Purchased 4 shirts ... ' inside a p tag with className='paragraph'", () => {
    render(<App />);
    expect(screen.getByText("Purchased 4 shirts and 6 pants for a total of 10 items")).toBeInTheDocument();
    expect(screen.getByText("Purchased 4 shirts and 6 pants for a total of 10 items").closest('p')).toHaveClass('paragraph')
  });  
  
  test("content has a link (a href) tag", () => {
    render(<App />);
    expect(screen.getByRole("link")).toBeInTheDocument();
  });
  
  test("displays 'Website' that links to thinkful.com", () => {
    render(<App />);
    expect(screen.getByText('Website').closest('a')).toHaveAttribute('href', 'https://www.thinkful.com/')

  });

});
