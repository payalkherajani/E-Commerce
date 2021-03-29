import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Products, SingleProduct, WishList, Landing, Cart } from './screens';
import { Navbar } from './components'

const App = () => {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Fragment>
            <Navbar />
            <Route exact path='/' component={Landing} />
            <Route exact path='/products' component={Products} />
            <Route exact path='/product/:id' component={SingleProduct} />
            <Route exact path='/wishlist' component={WishList} />
            <Route exact path='/cart' component={Cart} />
          </Fragment>
        </Switch>
      </Router>
    </div>
  )
}

export default App;
