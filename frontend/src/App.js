import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Landing from './screens/Landing';
import Products from './screens/Products';
import Navbar from './components/Navbar'

const App = () => {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Fragment>
            <Navbar />
            <Route exact path='/' component={Landing} />
            <Route exact path='/products' component={Products} />
          </Fragment>
        </Switch>
      </Router>
    </div>
  )
}

export default App;
