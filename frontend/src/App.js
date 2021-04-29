import React, { Fragment } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Products, SingleProduct, WishList, Landing, Cart, Register, Login } from './screens';
import { Navbar } from './components';
import PrivateRoute from './routes/Privateroute';

const App = () => {
  return (
    <div className="app">
      <Router>
        <Switch>
          <Fragment>
            <Navbar />
            <Route exact path='/' component={Landing} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <PrivateRoute exact path='/products' component={Products} />
            <PrivateRoute exact path='/product/:id' component={SingleProduct} />
            <PrivateRoute exact path='/wishlist' component={WishList} />
            <PrivateRoute exact path='/cart' component={Cart} />
          </Fragment>
        </Switch>
      </Router>
    </div>
  )
}

export default App;
