import React from 'react';
import Rating from './Rating';
import { Link } from 'react-router-dom';
import { ADD_TO_WISHLIST } from '../constants/type';
import useCustomContext from '../customHooks/Hook';
import axios from 'axios';
import Config from '../config/Config';
import { auth } from '../utlis/auth';
import { toast } from 'react-toastify';

const { serverUrl } = Config;

const Card = ({ product }) => {

    const token = auth();
    const { state: { wishlist }, dispatch } = useCustomContext();
    console.log({ product })
    const { _id, name, image, price, numReviews, rating, countInStock } = product;

    const addToWishlist = async () => {
        try {
            const { data } = await axios.post(`${serverUrl}/api/wishlists`, { 'productId': _id }, { headers: token });
            dispatch({ type: ADD_TO_WISHLIST, payload: data.productsinWishlist })
        } catch (err) {
            const error = err.response.data.message;
            toast.error(`${error}`);
        }
    }

    const check = () => {
        return wishlist.some((x) => x.productId._id === _id);
    }

    return (
        <div className="product-card" style={countInStock === 0 ? { backgroundColor: '#FEE2E2' } : { backgroundColor: 'white' }}>

            <div className="product-image-container">
                <img src={image} alt='product-image' className="image top-img-card" />
            </div>

            <div className="product-text-container">
                <div className="display-flex flex-direction-column" style={{ gap: '1rem' }}>
                    <strong className="color-primary">{name}</strong>
                    <h3>₹{price}</h3>
                    <Rating value={rating} numReviews={`${numReviews}`} />
                </div>


                {
                    countInStock === 0 ? (
                        <button className="btn btn-outline-primary">Out Of Stock</button>
                    ) : (
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
                    )
                }
            </div>

        </div>
    )
}

export default Card;