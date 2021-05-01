import React from 'react';
import Rating from './Rating';
import { Link } from 'react-router-dom';
import { ADD_TO_WISHLIST } from '../constants/WishListConstants';
import useCustomContext from '../customHooks/Hook';
import axios from 'axios';
import Config from '../config/Config';
import { auth } from '../utlis/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { serverUrl } = Config;

const Card = ({ product }) => {

    const token = auth();
    const { state: { wishlist }, dispatch } = useCustomContext();
    const { _id, name, image, price, numReviews, rating } = product;

    const addToWishlist = async () => {
        try {
            const { data } = await axios.post(`${serverUrl}/api/wishlists`, { 'productId': _id }, { headers: token });
            dispatch({ type: ADD_TO_WISHLIST, payload: data.productsinWishlist })
        } catch (err) {
            const error = err.response.data.message;
            toast.error(`${error}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    const check = () => {
        return !!wishlist.find((x) => x.productId._id === _id);
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
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </div>
    )
}

export default Card;