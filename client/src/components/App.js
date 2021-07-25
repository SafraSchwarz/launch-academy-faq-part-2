import React, { useState, useEffect } from 'react'
import Question from './Question'
import { hot } from "react-hot-loader/root"
import {BrowserRouter, Switch, Route} from 'react-router-dom'
import FAQList from "./FAQList"
import LauncherList from "./LauncherList.js"
import LauncherShow from "./LauncherShow.js"

const App = props=>{
return(
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={FAQList}/>
      <Route exact path="/launchers" component={LauncherList}/>
      <Route exact path="/launchers/:id" component={LauncherShow}/>
    </Switch>
  </BrowserRouter>
)
}

export default App