import React, { useState } from 'react';
import icon from '../assets/images/Hamburger_icon_white.svg';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const [visible, setVisible] = useState(false);
    return (
        <div>
            <nav className="nav nav-dark m-b-0">
                <h3><Link to={{ pathname: '/' }}>E-Commerce</Link></h3>
                <button className="toggle" onClick={() => setVisible((visible) => !visible)}>
                    <img src={icon} />
                </button>
                <ul className={visible === true ? ("nav-list") : (" nav-list nav-list-none")}>
                    <li><Link to={{ pathname: '/products' }}>Products</Link></li>
                    <li><Link to={{ pathname: '/wishlist' }}>WishList</Link></li>
                    <li><Link to={{ pathname: '/cart' }}>Cart</Link></li>
                </ul>
            </nav>
        </div>
    )
}

export default Navbar;