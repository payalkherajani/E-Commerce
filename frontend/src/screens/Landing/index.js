import React from 'react';
import { Redirect } from 'react-router-dom';

const Landing = () => {

    return (
        localStorage.getItem('TOKEN') ? (<Redirect to="/products" />) : (
            <div className="landing">
                <div className="landing-inner-center">
                    <p className="lead">
                        We'll make your journey remarkable. Shop with us!
                </p>
                </div>
            </div>
        )

    )
}

export default Landing
