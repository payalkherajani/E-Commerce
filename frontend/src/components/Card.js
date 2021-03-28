import React from 'react';
import Rating from './Rating';
import { Link } from 'react-router-dom';

const Card = ({ product }) => {

    const { id, name, image, price, numReviews, rating } = product;

    return (
        <div className="product-card">

            <div className="product-image-container">
                <img src={image} alt='product-image' className="image top-img-card" />
            </div>

            <div className="product-text-container">
                <div className="d-flex flex-direction-column m-l-1 flex-grow-1" >
                    <strong className="color-primary">{name}</strong>
                    <h3>₹{price}</h3>
                    <Rating value={rating} numReviews={`${numReviews} reviews`} />
                </div>

                <div className="product-card-footer">
                    <Link to={{ pathname: `/product/${id}` }}> <button className="btn btn-info">View</button></Link>
                </div>
            </div>
        </div>
    )
}

export default Card;