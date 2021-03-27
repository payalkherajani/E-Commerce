import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Landing from './screens/Landing';
import Products from './screens/Products';
import Navbar from './components/Navbar'
import SingleProduct from './screens/SingleProduct';
import WishList from './screens/WishList';
import Cart from './screens/Cart';

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
