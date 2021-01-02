import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";

import Feed from "./pages/Feed";

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/cadastro" exact component={Cadastro} />
        
        <Route path="/feed" exact component={Feed} />
      </Switch>
    </BrowserRouter>
  );
}
export default Routes;