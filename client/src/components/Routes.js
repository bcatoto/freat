import React from "react"
import { Switch, Route } from "react-router-dom"
import Landing from "./Landing"
import Home from "./Home"
import Profile from "./Profile"

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Landing}/>
    <Route path="/home" component={Home}/>
    <Route path="/profile" component={Profile}/>
  </Switch>
)

export default Routes;
