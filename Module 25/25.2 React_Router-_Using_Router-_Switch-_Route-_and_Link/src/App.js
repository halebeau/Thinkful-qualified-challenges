import React from "react";
import { Link, Route, Switch } from "react-router-dom";

function App() {
  return (
    // No need to add <Router>, it has been added to ./index.js
    <div className="App">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
      <Switch>
        <Route exact path="/">
          <h1>Welcome to the home page</h1>
        </Route>
        <Route path="/about">
          <h1>You are on the about page</h1>
        </Route>
        <Route path="/contact">
          <h1>Please feel free to email us</h1>
        </Route>
        <Route>
          <h1>404 Not Found</h1>
        </Route>
      </Switch>
    </div>
  );
}

export default App;
