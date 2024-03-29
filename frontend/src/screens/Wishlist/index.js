import React, { useState } from 'react';
import useCustomContext from '../../customHooks/Hook';
import { Message, Rating } from '../../components';
import { Link } from 'react-router-dom';
import styles from './wishlist.module.css';
import axios from 'axios';
import { auth } from '../../utlis/auth';
import Config from '../../config/Config';
import { REMOVE_FROM_WISHLIST } from '../../constants/type';
import { toast } from 'react-toastify';
import { addToCart } from '../../utlis/cart'

const { serverUrl } = Config

const WishList = () => {
    const token = auth()
    const { state: { wishlist, cart }, dispatch } = useCustomContext();
    const [qty, setQty] = useState(1);

    const removefromWishList = async (id) => {
        try {
            const { data } = await axios.delete(`${serverUrl}/api/wishlists/${id}`, { headers: token })
            dispatch({ type: REMOVE_FROM_WISHLIST, payload: data.productsinWishlist })
        } catch (err) {
            const error = err.response.data.message;
            toast.error(`${error}`);
        }
    }

    const checkincart = (item) => {
        return cart.some((x) => x.productId._id === item._id)
    }

    return (
        <div className={styles.wishlist_container}>
            <Link to='/products' className="padding-half"><button className="btn btn-primary margin-bottom-half">Go Back</button></Link>
            <div className={styles.wishlist_heading}><h1>Aapki Wishlist</h1></div>

            {
                wishlist.length === 0 ?
                    (<Message>Your Wishlist is Empty</Message>)
                    :
                    (
                        <div className={styles.wishlist_card}>
                            {
                                wishlist.map(({ productId, _id }) => (
                                    <div key={_id} className={styles.single_wishlist_card}>

                                        <div className={styles.wishlist_image_container}>
                                            <img src={productId.image} className="wishlist_image" className={styles.wishlist_image} />
                                        </div>

                                        <div className={styles.wishlist_details_container}>
                                            <ul className="list-group">
                                                <li className={styles.list_item}><strong>{productId.name}</strong></li>
                                                <li className={styles.list_item}>{productId.description}</li>
                                                <li className={styles.list_item}>₹{productId.price}</li>
                                                <li className={styles.list_item}><Rating value={productId.rating} numReviews={productId.numReviews} /></li>
                                                <li className={styles.list_item}>
                                                    <select value={qty} onChange={(e) => setQty((qty) => Number(e.target.value))} className="select-css">
                                                        {
                                                            [...Array(productId.countInStock).keys()].map((count) => (
                                                                <option key={count} value={count + 1}>
                                                                    { count + 1}
                                                                </option>
                                                            ))
                                                        }
                                                    </select>
                                                </li>
                                                <li className={styles.list_item}>
                                                    {
                                                        checkincart(productId) === true ?
                                                            <button disabled className="btn btn-success">Added to cart</button>
                                                            :
                                                            <button onClick={() => addToCart(productId, qty, token, dispatch)} disabled={productId.countInStock === 0} className="btn btn-info">Add to cart</button>
                                                    }
                                                </li>
                                                <li className={styles.list_item}><button className="btn btn-danger" onClick={() => removefromWishList(productId._id)}>Remove</button></li>
                                            </ul>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    )}
        </div>
    )
}

export default WishList;
