import React from 'react';
import Rating from './Rating';
import { Link } from 'react-router-dom';
import { ADD_TO_WISHLIST } from '../constants/WishListConstants';
import useCustomContext from '../customHooks/Hook';

const Card = ({ product }) => {

    const { state: { wishlist }, dispatch } = useCustomContext();
    const { _id, name, image, price, numReviews, rating } = product;

    const addToWishlist = () => {
        dispatch({ type: ADD_TO_WISHLIST, payload: product })
    }

    const check = () => {
        return !!wishlist.find((x) => x.id === _id);
    }

    return (
        <div className="product-card">

            <div className="product-image-container">
                <img src={image} alt='product-image' className="image top-img-card" />
            </div>

            <div className="product-text-container">
                <div className="display-flex flex-direction-column margin-left-1 flex-grow-1" >
                    <strong className="color-primary">{name}</strong>
                    <h3>₹{price}</h3>
                    <Rating value={rating} numReviews={`${numReviews}`} />
                </div>

                <div className="product-card-footer">

                    <Link to={{ pathname: `/product/${_id}` }}> <button className="btn btn-info">View</button></Link>
                    <div>
                        {
                            check() === true ?
                                <button disabled className="btn btn-success">Wishlisted</button>
                                :
                                <button onClick={addToWishlist} className="btn btn-info">Wishlist</button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card;