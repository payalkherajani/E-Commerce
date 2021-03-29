import React, { useState } from 'react';
import icon from '../assets/images/Hamburger_icon_white.svg';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    return (
        <nav className="nav nav-dark m-b-0 navbar-fixed-top p-0">
            <h3 className="transform-lowercase"><Link to={{ pathname: '/' }}>safarnama</Link></h3>
            <button className="hamburger-icon" onClick={() => setVisible((visible) => !visible)}>
                <img src={icon} />
            </button>
            <ul className={visible === true ? ("nav-list") : (" nav-list nav-list-none")}>

                <Link to={{ pathname: '/products' }}>
                    <li className="navbar-list-item">
                        <span>Products</span>
                        <i className="fas fa-credit-card"></i>
                    </li>
                </Link>

                <Link to={{ pathname: '/wishlist' }}>
                    <li className="navbar-list-item">
                        <span>WishList</span>
                        <i className="far fa-heart"></i>
                    </li>
                </Link>
                <Link to={{ pathname: '/cart' }}>
                    <li className="navbar-list-item">
                        <span>Cart</span>
                        <i className="fas fa-shopping-bag"></i>
                    </li>
                </Link>
            </ul>
        </nav>
    )
}

export default Navbar;