import { render } from "@testing-library/react";
import { Route, Router } from "react-router-dom";
import PostLink from "../user/PostLink";
import { screen } from "@testing-library/dom";
import React from "react";
import { createMemoryHistory } from "history";

describe("PostLink component", () => {
  test("# Posts » links to {nearest-route-path}/posts", async () => {
    const mockPost = {
      userId: 1,
      id: 11,
      title:
        "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      body:
        "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
    };

    const history = createMemoryHistory();
    history.push("/test/post-link/urls");
    const { getByText } = render(
      <Router history={history}>
        <Route path="/test/post-link/urls">
          <PostLink post={mockPost} />
        </Route>
      </Router>
    );

    await screen.findByText(/sunt aut facere repellat.*/i);

    // This component is rendered on another URL to make sure it uses the nearest route to create links
    expect(getByText(/sunt aut facere repellat.*/i).getAttribute("href")).toBe(
      "/test/post-link/urls/11"
    );
  });
});
