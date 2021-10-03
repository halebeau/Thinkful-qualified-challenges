import React from "react";
import { Router } from "react-router-dom";
import { render } from "@testing-library/react";
import App from "../App";
import { createMemoryHistory } from "history";
import { fireEvent, screen } from "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";
require("cross-fetch/polyfill");

describe("App", () => {
  test("landing on a bad page shows 404 page", () => {
    const history = createMemoryHistory();
    history.push("/some/bad/route");
    const { getByRole } = render(
      <Router history={history}>
        <App />
      </Router>
    );
    expect(getByRole("heading")).toHaveTextContent("404 Not Found");
  });

  test("route for /user/new", () => {
    const history = createMemoryHistory();
    const { container, getByText } = render(
      <Router history={history}>
        <App />
      </Router>
    );

    fireEvent.click(getByText(/new user/i));

    // check that the content changed to the new page
    expect(container.innerHTML).toMatch("Unable to create a new user");
  });

  test("route for /user/:userId", async () => {
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

    jest
      .spyOn(window, "fetch")
      .mockImplementationOnce(() =>
        Promise.resolve({ json: () => Promise.resolve(mockUser) })
      );

    const history = createMemoryHistory();
    const { container, getByTestId } = render(
      <Router history={history}>
        <App />
      </Router>
    );

    fireEvent.click(getByTestId("user-1"));

    await screen.findByText(/Clementina DuBuque/i);

    // check that the content changed to the new page
    expect(container.innerHTML).toMatch("Rey.Padberg@karina.biz");
  });
});
