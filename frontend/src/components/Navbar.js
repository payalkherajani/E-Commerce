import React, { useState } from 'react';
import icon from '../assets/images/Hamburger_icon_white.svg';
import { Link } from 'react-router-dom';
import useCustomContext from '../customHooks/Hook';

const Navbar = () => {

    const [visible, setVisible] = useState(false);
    const { state } = useCustomContext()

    return (
        <nav className="nav nav-dark m-b-0 navbar-fixed-top p-0">
            <h3 className="transform-lowercase"><Link to={{ pathname: '/' }}>safarnama</Link></h3>

            <button className="hamburger-icon" onClick={() => setVisible((visible) => !visible)}>
                <img src={icon} alt="hamburger-icon" />
            </button>

            <ul className={visible === true ? ("nav-list") : (" nav-list nav-list-none")}>

                <Link to={{ pathname: '/products' }}>
                    <li className="badge-relative" onClick={() => setVisible((visible) => !visible)}>
                        Products
                    </li>
                </Link>

                <Link to={{ pathname: '/wishlist' }}>
                    <li className="badge-relative" onClick={() => setVisible((visible) => !visible)}>
                        WishList
                        <span className="badge-nav-wishlist">{state.wishlist.length}</span>
                    </li>
                </Link>
                <Link to={{ pathname: '/cart' }}>
                    <li className="badge-relative" onClick={() => setVisible((visible) => !visible)}>
                        Cart
                        <span className="badge-nav-cart">{state.cart.length}</span>
                    </li>
                </Link>
            </ul>
        </nav>
    )
}

export default Navbar;