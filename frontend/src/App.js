import React, { Fragment, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Products, SingleProduct, WishList, Landing, Cart, Register, Login, Checkout } from './screens';
import { Navbar, Footer } from './components';
import PrivateRoute from './routes/Privateroute';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import { fetchCartProducts } from './services/cart.service';
import useCustomContext from './customHooks/Hook';
import { fetchProductsinWishlist } from './services/wishlist.service';
import { fetchUserDetails } from './services/users.service';




const App = () => {

  const { dispatch } = useCustomContext();

  useEffect(() => {
    if (localStorage.TOKEN) {
      fetchCartProducts(dispatch)
      fetchProductsinWishlist(dispatch)
      fetchUserDetails(dispatch)
    }
  }, [])

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
            <PrivateRoute exact path='/checkout' component={Checkout} />
            <Footer />
          </Fragment>
        </Switch>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  )
}

export default App;
