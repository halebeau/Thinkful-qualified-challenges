import { render } from "@testing-library/react";
import { Router } from "react-router-dom";
import Card from "../home/Card";
import { screen } from "@testing-library/dom";
import React from "react";
import { createMemoryHistory } from "history";
import NotFound from "../common/NotFound";

describe("NotFound component", () => {
  test("Contains a link to/", async () => {
    const history = createMemoryHistory();
    const { getByText } = render(
      <Router history={history}>
        <NotFound />
      </Router>
    );

    await screen.findByText(/Return Home/i);

    expect(getByText(/Return Home/i).getAttribute("href")).toBe("/");
  });
});
