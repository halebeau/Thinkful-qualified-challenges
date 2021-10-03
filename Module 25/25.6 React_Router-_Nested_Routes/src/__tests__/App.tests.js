import React from "react";
import { Route, Router } from "react-router-dom";
import { render } from "@testing-library/react";
import users from "../data.json";
import { createMemoryHistory } from "history";
import "@testing-library/jest-dom/extend-expect";
import User from "../User";
import UserPosts from "../UserPosts";
import UserPost from "../UserPost";

require("cross-fetch/polyfill");

describe("Nested routes", () => {
  describe("User component", () => {
    test("displays UserProfile by default", () => {
      const history = createMemoryHistory();

      history.push("/adviser/5");

      const { getByText, queryByText } = render(
        <Router history={history}>
          <Route exact={true} path="/adviser/:userId">
            <User users={users} />
          </Route>
        </Router>
      );
      expect(getByText("Lucio_Hettinger@annie.ca")).toBeTruthy();
      expect(getByText("(254)954-1289")).toBeTruthy();
      expect(queryByText("non est facere")).toBeFalsy();
    });

    test("displays UserPosts when url ends with /posts", () => {
      const history = createMemoryHistory();

      history.push("/plastic/3/posts");

      const { getByText, queryByText } = render(
        <Router history={history}>
          <Route path="/plastic/:userId">
            <User users={users} />
          </Route>
        </Router>
      );
      expect(queryByText("Nathan@yesenia.net")).toBeFalsy();
      expect(queryByText("1-463-123-4447")).toBeFalsy();
      expect(
        getByText("asperiores ea ipsam voluptatibus modi minima quia sint")
      ).toBeTruthy();
      expect(getByText("a quo magni similique perferendis")).toBeTruthy();
    });

    test("uses route URL in links", () => {
      const history = createMemoryHistory();

      history.push("/spot/5");

      const { getByTestId } = render(
        <Router history={history}>
          <Route exact={true} path="/spot/:userId">
            <User users={users} />
          </Route>
        </Router>
      );

      expect(getByTestId("user-profile").getAttribute("href")).toBe("/spot/5");
      expect(getByTestId("user-posts").getAttribute("href")).toBe(
        "/spot/5/posts"
      );
    });
  });

  describe("UserPosts component", () => {
    test("UserPosts component uses route URL in links", () => {
      const history = createMemoryHistory();

      const user = users.find((user) => user.id === 2);

      history.push("/lake/2/posts");

      const { getByTestId } = render(
        <Router history={history}>
          <Route exact={true} path="/lake/:userId/posts">
            <UserPosts posts={user.posts} />
          </Route>
        </Router>
      );

      expect(getByTestId("user-post-11").getAttribute("href")).toBe(
        "/lake/2/posts/11"
      );
      expect(getByTestId("user-post-20").getAttribute("href")).toBe(
        "/lake/2/posts/20"
      );
    });

    test("displays UserPost when url ends with :postID", () => {
      const history = createMemoryHistory();

      history.push("/palace/4/posts/32");

      const user = users.find((user) => user.id === 4);

      const { getByText } = render(
        <Router history={history}>
          <Route path="/palace/:userId/posts/:postId">
            <User users={users} />
            <UserPosts posts={user.posts} />
            <UserPost posts={user.posts} />
          </Route>
        </Router>
      );

      expect(getByText("Patricia Lebsack")).toBeTruthy();
      expect(getByText("ullam ut quidem id aut vel consequuntur")).toBeTruthy();
      expect(getByText("deserunt eos nobis asperiores et hic est debitis repellat molestiae optio nihil ratione ut eos beatae quibusdam distinctio maiores earum voluptates et aut adipisci ea maiores voluptas maxime")).toBeTruthy();
    });
  });
});
