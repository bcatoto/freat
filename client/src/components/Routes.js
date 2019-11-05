import React from 'react'
import { Switch, Route } from 'react-router-dom'
import Main from './Main'
import Profile from './Profile'

const Routes = () => (
  <Switch>
    <Route exact path='/' component={Main}/>
    <Route path='/profile' component={Profile}/>
  </Switch>
)

export default Routes;
