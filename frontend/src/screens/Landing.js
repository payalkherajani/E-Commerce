import React from 'react'
import landing from '../assets/images/landing.jpg';
import Navbar from '../components/Navbar';

const Landing = () => {
    return (
        <>
            <Navbar />
            <img src={landing} alt="landing-img" className="image" />
        </>
    )
}

export default Landing
