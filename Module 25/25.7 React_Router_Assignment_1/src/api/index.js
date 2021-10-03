export const deletePost = ignoreAbortError(deletePostDelegate);
export const fetchUsersWithPosts = ignoreAbortError(
  fetchUsersWithPostsDelegate
);
export const fetchUserWithPosts = ignoreAbortError(fetchUserWithPostsDelegate);

function ignoreAbortError(delegate) {
  return async (...delegateArguments) => {
    try {
      return await delegate.apply(null, delegateArguments);
    } catch (error) {
      if (error.name !== "AbortError") {
        throw error;
      }
    }
  };
}

async function deletePostDelegate(postId, signal) {
  const url = `https://jsonplaceholder.typicode.com/posts/${postId}`;
  const response = await fetch(url, { method: "DELETE", signal });
  return response.json();
}

async function fetchUserWithPostsDelegate(userId, signal) {
  const url = `https://jsonplaceholder.typicode.com/users/${userId}`;
  const response = await fetch(url, { signal });
  if (response.status !== 200) {
    throw new Error(`User not found with ID: ${userId}`);
  }
  const user = await response.json();
  user.posts = await fetchPostsForUser(userId, signal);
  return user;
}

async function fetchUsersWithPostsDelegate(signal) {
  try {
    const users = await fetchUsers(signal);
    return await Promise.all(
      users.map((user) =>
        fetchPostsForUser(user.id, signal).then((posts) => {
          user.posts = posts;
          return user;
        })
      )
    );
  } catch (error) {
    if (error.name !== "AbortError") {
      throw error;
    }
  }
}

async function fetchUsers(signal) {
  const url = `https://jsonplaceholder.typicode.com/users`;
  const response = await fetch(url, { signal });
  return response.json();
}

async function fetchPostsForUser(userId, signal) {
  const url = `https://jsonplaceholder.typicode.com/posts?userId=${userId}`;
  const response = await fetch(url, { signal });
  return response.json();
}
