import React from "react";
import { Router } from "react-router-dom";
import { render } from "@testing-library/react";
import App from "../App";
import { screen } from "@testing-library/dom";
import { createMemoryHistory } from "history";
import "@testing-library/jest-dom/extend-expect";
import { fetchUsersWithPosts, fetchUserWithPosts } from "../api";

require("cross-fetch/polyfill");

jest.mock("../api");

describe("App", () => {
  afterEach(() => {
    fetchUserWithPosts.mockReset();
    fetchUsersWithPosts.mockReset();
  });

  test("Navigating to an unknown  URL shows 'Page not found!'", async () => {
    fetchUserWithPosts.mockImplementation(() =>
      Promise.reject(
        new Error("When the implementation is correct, this will not be called")
      )
    );

    fetchUsersWithPosts.mockImplementation(() =>
      Promise.reject(
        new Error("When the implementation is correct, this will not be called")
      )
    );

    const history = createMemoryHistory();
    history.push("/this/route/does/not/exist");
    const { getByText } = render(
      <Router history={history}>
        <App />
      </Router>
    );

    await screen.findByText(/page not found/i);

    expect(getByText("Page not found!")).toBeTruthy();
  });

  test("/ does not show 'Go Home', user info, or blog posts", async () => {
    const mockUsers = [
      {
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
        posts: [],
      },
    ];

    fetchUserWithPosts.mockImplementation(() =>
      Promise.reject(
        new Error("When the implementation is correct, this will not be called")
      )
    );

    fetchUsersWithPosts.mockImplementation(() => Promise.resolve(mockUsers));

    const history = createMemoryHistory();
    const { queryAllByText } = render(
      <Router history={history}>
        <App />
      </Router>
    );

    await screen.findByText(/Clementina DuBuque/i);

    expect(queryAllByText(/email/i)).toHaveLength(0);
    expect(queryAllByText(/go home/i)).toHaveLength(0);
    expect(queryAllByText(/profile/i)).toHaveLength(0);
    expect(queryAllByText(/sunt aut facere/i)).toHaveLength(0);
    expect(queryAllByText(/user name/i)).toHaveLength(0);
    expect(queryAllByText(/delete/i)).toHaveLength(0);
    expect(queryAllByText(/no post selected/i)).toHaveLength(0);
  });
});
