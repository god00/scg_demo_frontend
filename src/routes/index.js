import React from "react";
import { Switch } from "react-router-dom";
import Route from "./route";

import Home from '../components/home';
import About from '../components/about';
import SCG from '../components/scg';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/about" component={About} />
      <Route path="/SCG" component={SCG} />
    </Switch>
  );
}