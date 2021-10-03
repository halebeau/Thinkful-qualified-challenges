import React from "react";
import { Link, Route, Switch } from "react-router-dom";
import UserProfile from "./UserProfile";

function Home() {
  return <p>Home</p>;
}

// No need to change this component
function App() {
  return (
    <div className="App">
      <div>
        <Link to="/">Home</Link>
      </div>
      {Array(10)
        .fill(1)
        .map((one, index) => index + one)
        .map((id) => (
          <div key={id}>
            <Link to={`/user/${id}`}>User {id}</Link>
          </div>
        ))}
      <Switch>
        <Route exact={true} path="/">
          <Home />
        </Route>
        <Route path="/user/:userId">
          <UserProfile />
        </Route>
      </Switch>
    </div>
  );
}

export default App;