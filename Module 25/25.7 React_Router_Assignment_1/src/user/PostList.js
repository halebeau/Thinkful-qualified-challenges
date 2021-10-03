import React from "react";

import Post from "./Post";
import PostLink from "./PostLink";
import NoPostSelectedMessage from "./NoPostSelectedMessage";
import { Route, Switch, useParams } from "react-router-dom";

/*
  TODO: Update the below so that the components show on the appropriate route.
  The <NoPostSelectedMessage /> component should show up on the following route:
  /users/:userId/posts
  The <Post /> component should show up on the following route:
  /users/:userId/posts/:postId
*/

export const PostList = ({ posts }) => {
  const postLinks = posts.map((post) => (
    <PostLink key={post.id} userId={post.userId} post={post} />
  ));
  const { userId, postId } = useParams();

  return (
    <div className="row pt-2">
      <div className="col-3">
        <ul className="list-group">{postLinks}</ul>
      </div>
      <div className="col-9">
        <div path={`/users/${userId}/posts/${postId}`}>
          <Post posts={posts} />
        </div>
      </div>
    </div>
  );
};

export default PostList;