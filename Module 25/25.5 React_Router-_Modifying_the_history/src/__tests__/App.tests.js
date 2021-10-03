import React from "react";
import { act, render } from "@testing-library/react";
import App from "../App";
import { createMemoryHistory } from "history";
import "@testing-library/jest-dom/extend-expect";
import { Router } from "react-router-dom";
import { fireEvent, screen } from "@testing-library/dom";

require("cross-fetch/polyfill");

describe("App", () => {
  test("go home after delete finishes", async () => {
    const mockUser = {
      id: 10,
      name: "Clementina DuBuque",
      username: "Moriah.Stanton",
      email: "Rey.Padberg@karina.biz",
      address: {
        street: "Kattie Turnpike",
        suite: "Suite 198",
        city: "Lebsackbury",
        zipcode: "31428-2261",
        geo: {
          lat: "-38.2386",
          lng: "57.2232",
        },
      },
      phone: "024-648-3804",
      website: "ambrose.net",
      company: {
        name: "Hoeger LLC",
        catchPhrase: "Centralized empowering task-force",
        bs: "target end-to-end models",
      },
    };

    const mockFetch = jest
      .spyOn(window, "fetch")
      .mockImplementation(() =>
        Promise.resolve({ json: () => Promise.resolve(mockUser) })
      );

    const history = createMemoryHistory();
    history.push("/user/1");

    const { getByText } = render(
      <Router history={history}>
        <App />
      </Router>
    );

    await screen.findByText(/Clementina DuBuque/i);

    await act(async () => fireEvent.click(getByText(/delete/i)));

    expect(
      mockFetch
    ).toHaveBeenCalledWith("https://jsonplaceholder.typicode.com/users/1", {
      method: "DELETE",
    });

    expect(history.location.pathname).toBe("/");
  });
});
