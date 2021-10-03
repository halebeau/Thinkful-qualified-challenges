import { render } from "@testing-library/react";
import { Route, Router } from "react-router-dom";
import PostList from "../user/PostList";
import React from "react";
import { createMemoryHistory } from "history";

describe("PostList", () => {
  test("links to posts use nearest route path", () => {
    const posts = [
      {
        userId: 8,
        id: 75,
        title: "dignissimos eum dolor ut enim et delectus in",
        body:
          "commodi non non omnis et voluptas sit\nautem aut nobis magnam et sapiente voluptatem\net laborum repellat qui delectus facilis temporibus\nrerum amet et nemo voluptate expedita adipisci error dolorem",
      },
    ];

    const history = createMemoryHistory();
    history.push("/test/post-list/posts");
    const { getByText } = render(
      <Router history={history}>
        <Route path="/test/post-list/posts">
          <PostList posts={posts} />
        </Route>
      </Router>
    );

    // This component is rendered on another URL to make sure it uses the nearest route to create links
    expect(getByText(/dignissimos/i).getAttribute("href")).toBe(
      "/test/post-list/posts/75"
    );
  });

  test("displays 'No post selected' on /posts", () => {
    const posts = [
      {
        userId: 7,
        id: 68,
        title: "odio quis facere architecto reiciendis optio",
        body:
          "magnam molestiae perferendis quisquam\nqui cum reiciendis\nquaerat animi amet hic inventore\nea quia deleniti quidem saepe porro velit",
      },
    ];

    const history = createMemoryHistory();
    history.push("/test/post-list/posts");
    const { getByText, queryByText } = render(
      <Router history={history}>
        <Route path="/test/post-list/posts">
          <PostList posts={posts} />
        </Route>
      </Router>
    );

    expect(getByText(/No post selected/i)).toBeTruthy();
    expect(queryByText(/Nodio quis facere/i)).toBeFalsy();
  });

  test("displays Post on /posts/:postId", () => {
    const posts = [
      {
        userId: 1,
        id: 13,
        title: "ea molestias quasi exercitationem repellat qui ipsa sit aut",
        body:
          "et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut",
      },
    ];

    const history = createMemoryHistory();
    history.push("/test/post-list/posts/13");
    const { queryByText, getByText } = render(
      <Router history={history}>
        <Route path="/test/post-list/posts">
          <PostList posts={posts} />
        </Route>
      </Router>
    );

    expect(getByText(/et labore et velit aut/i)).toBeTruthy();
    expect(getByText(/delete post/i)).toBeTruthy();
    expect(queryByText(/No post selected/i)).toBeFalsy();
  });
});
