import React from 'react';
import Rating from './Rating';
import { Link } from 'react-router-dom';
import useCustomContext from '../customHooks/Hook';
import { ADD_TO_WISHLIST } from '../constants/WishListConstants';

const Card = ({ product }) => {

    const { id, name, image, price, numReviews, rating } = product;
    const { state: { wishlist }, dispatch } = useCustomContext();

    const addToWishlist = () => {
        dispatch({ type: ADD_TO_WISHLIST, payload: product })
    }

    const check = () => {
        return !!wishlist.find((x) => x.id === id);
    }

    return (
        <div className="card card-secondary fixed-width">
            <Link to={{ pathname: `/product/${id}` }}><img src={image} alt='product-image' className="image top-img-card" /></Link>
            <div className="card-body flex-grow-1 d-flex flex-direction-column" >
                <strong>{name}</strong>
                <h3>₹{price}</h3>
                <Rating value={rating} numReviews={`${numReviews} reviews`} />
            </div>
            <div className="card-footer">
                {
                    check() === true ?
                        <button disabled className="btn btn-outline-danger">Added To Wishlist</button>
                        :
                        <button onClick={addToWishlist} className="btn btn-outline-secondary">Wishlist</button>
                }
            </div>
        </div>
    )
}

export default Card;