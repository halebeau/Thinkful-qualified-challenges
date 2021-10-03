import React from "react";
import { Link } from "react-router-dom";

export const Users = ({ users = [] }) => {
  const rows = users.map((user) => (
    <tr key={user.id}>
      <td>{user.id}</td>
      <td>{user.username}</td>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>
        <Link to={`/users/${user.id}`}>View -></Link>
      </td>
    </tr>
  ));

  return (
    <section>
      <h2>Users</h2>
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>User Name</th>
            <th>Name</th>
            <th>Email</th>
            <th>View</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    </section>
  );
};

export default Users;