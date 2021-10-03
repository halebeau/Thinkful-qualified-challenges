import React from "react";

function Roster({ detailed, roster }) {
  if (!detailed) {
    const list = roster.map(({firstName, id}) => <li key={id}>{firstName}</li>);
    return <ol>{list}</ol>;
  }
  const list = roster.map(({id, firstName, lastName, location}) => {
    return <tr key={id}><td>{id}</td><td>{firstName}</td><td>{lastName}</td><td>{location}</td></tr>
  })
  console.log(list)
  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Location</th>
        </tr>
      </thead>
      <tbody>
        {list}
      </tbody>
    </table>
  )
}

export default Roster;