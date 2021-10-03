import React from "react";
import {render, within, screen} from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Roster from "../src/Roster";


describe("Test App.jsx", () => {
  const roster = [
    { id: "1", firstName: "John", lastName: "Smith", location: "California" },
    { id: "2", firstName: "April", lastName: "White", location: "Nebraska" },
    { id: "3", firstName: "Jane", lastName: "Doe", location: "Florida" },
    { id: "7", firstName: "Dan", lastName: "Lee", location: "New Mexico" },
  ];
  const keys = ["id", "firstName", "lastName", "location"];

  test("Roster detailed view", () => {
    render(<Roster detailed={true} roster={roster} />);
    expect(screen.getAllByRole("table")).toHaveLength(1);
    expect(screen.getAllByRole("row")).toHaveLength(roster.length + 1);
    expect(screen.queryAllByRole("cell")).toHaveLength(16);

    const cells = screen.queryAllByRole("cell");
    const names = cells.map(item => item.textContent);
    expect(names).toMatchInlineSnapshot(`
        Array [
          "1",
          "John",
          "Smith",
          "California",
          "2",
          "April",
          "White",
          "Nebraska",
          "3",
          "Jane",
          "Doe",
          "Florida",
          "7",
          "Dan",
          "Lee",
          "New Mexico",
        ]
    `);
  });

  test("Roster not detailed view", () => {
    render(<Roster detailed={false} roster={roster} />);
    const list = screen.getByRole("list");
    const { getAllByRole } = within(list);
    const items = getAllByRole("listitem");
    const names = items.map(item => item.textContent);
    expect(names).toMatchInlineSnapshot(`
       Array [
         "John",
         "April",
         "Jane",
         "Dan",
       ]
    `);
  });
});
