import React from 'react'
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect
} from 'react-router-dom'
import { Board } from './pages'
import { Routes } from './constants/routes'
import { Navbar } from './containers/'

const App = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path={Routes.BOARD} component={Board} exact />
        <Redirect strict from='/' to={Routes.BOARD} />
      </Switch>
    </Router>
  )
}

export default App
