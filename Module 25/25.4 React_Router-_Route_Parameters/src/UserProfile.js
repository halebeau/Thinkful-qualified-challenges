import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function UserProfile() {
  const [user, setUser] = useState({});
  const { userId } = useParams();

  useEffect(() => {
    const abortController = new AbortController();

    async function loadUser() {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users/${userId}`,
          { signal: abortController.signal }
        );

        const user = await response.json();
        setUser(user);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error(error);
        }
      }
    }

    loadUser();

    return () => {
      abortController.abort(); // cancels any pending request or response
    };
  }, [userId]);

  // You do not need to change this component

  if (user.id) {
    return Object.entries(user).map(([key, value]) => (
      <div key={key}>
        <label>{key}</label>: {JSON.stringify(value)}
        <hr />
      </div>
    ));
  }
  return "Loading...";
}

export default UserProfile;