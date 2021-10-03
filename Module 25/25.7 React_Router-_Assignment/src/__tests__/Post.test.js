import { deletePost } from "../api";
import { render } from "@testing-library/react";
import { Route, Router } from "react-router-dom";
import { fireEvent, screen } from "@testing-library/dom";
import React from "react";
import { createMemoryHistory } from "history";
import Post from "../user/Post";

require("cross-fetch/polyfill");

jest.mock("../api");

test("Delete post redirects to home page", async () => {
  const mockPosts = [
    {
      userId: 9,
      id: 86,
      title: "placeat quia et porro iste",
      body:
        "quasi excepturi consequatur iste autem temporibus sed molestiae beatae\net quaerat et esse ut\nvoluptatem occaecati et vel explicabo autem\nasperiores pariatur deserunt optio",
    },
    {
      userId: 9,
      id: 87,
      title: "nostrum quis quasi placeat",
      body:
        "eos et molestiae\nnesciunt ut a\ndolores perspiciatis repellendus repellat aliquid\nmagnam sint rem ipsum est",
    },
  ];

  deletePost.mockImplementation(() => Promise.resolve({}));

  window.confirm = jest.fn();
  window.confirm.mockImplementation(() => true);

  const history = createMemoryHistory();
  history.push("/user-test/9/posts/87");
  const { getByText } = render(
    <Router history={history}>
      <Route path="/user-test/:userId/posts/:postId">
        <Post posts={mockPosts} />
      </Route>
    </Router>
  );

  await screen.findByText(/eos et molestiae/i);

  await fireEvent.click(getByText(/delete post/i));

  expect(window.confirm).toHaveBeenCalledWith(
    "Are you sure you want to delete this post?"
  );
  expect(history.location.pathname).toBe("/");
});
