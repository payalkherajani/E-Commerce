import React from 'react';
import Rating from './Rating';
import { Link } from 'react-router-dom';

const Card = ({ id, name, image, price, numReviews, rating }) => {

    return (
        <div className="card card-secondary fixed-width">
            <Link to={{ pathname: `/product/${id}` }}><img src={image} alt='product-image' className="image top-img-card" /></Link>
            <div className="card-body flex-grow-1 d-flex flex-direction-column" >
                <strong>{name}</strong>
                <h3>₹{price}</h3>
                <Rating value={rating} numReviews={`${numReviews} reviews`} />
            </div>
            <div className="card-footer">
                <button className="btn btn-outline-secondary">Wishlist</button>
                <button className="btn btn-outline-secondary">Cart</button>
            </div>
        </div>
    )
}

export default Card
