import { render } from "@testing-library/react";
import { Router } from "react-router-dom";
import React from "react";
import PostsNav from "../user/PostsNav";
import { createMemoryHistory } from "history";

describe("PostNav", () => {
  test('Go Home links to "/"', () => {
    const history = createMemoryHistory();

    const { getByText } = render(
      <Router history={history}>
        <PostsNav />
      </Router>
    );

    expect(getByText(/go home/i).getAttribute("href")).toBe("/");
  });
});
