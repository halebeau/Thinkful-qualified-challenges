import React, { Fragment } from "react";
import { Route, useRouteMatch } from "react-router-dom";

import Header from "./common/Header";
import CardList from "./home/CardList";
import User from "./user/User";
import NotFound from './common/NotFound'

function App() {
  /*
    TODO: There is no need to add a <Router >, it is in index.js.
    The <CardList /> component should be shown when the user is on the index path.
    The <User /> component should be shown when the user is on the following path:
    /users/:userId
    Display <NotFound /> when appropriate
  */
  const { url } = useRouteMatch();
  return (
    <Fragment>
      <Route path={url}>
        <Header />
      </Route>
      <Route path={`/users/:userId`}>
        <User />
      </Route>
      <Route exact path={`${url}/`}>
        <CardList />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Fragment>
  );
}

export default App;