import React from 'react';
import landing from '../assets/images/landing.jpg'

const Navbar = () => {
    return (
        <div>
            <nav className="nav nav-dark m-b-0">
                <h3>E-Commerce</h3>
                {/* <button className="toggle" onclick="toggle('nav-list')">
                    <img src="assets/Favicon/Hamburger_icon_white.svg" />
                </button> */}
                <ul className="nav-list" id='nav-list'>
                    <li>Products</li>
                    <li>WishList</li>
                    <li>Cart</li>
                </ul>
            </nav>
            <img src={landing} alt="landing-img" className="image" />
        </div>
    )
}

export default Navbar;