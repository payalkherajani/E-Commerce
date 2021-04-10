import React, { useState, useEffect } from 'react';
import useCustomContext from '../../customHooks/Hook';
import { REMOVE_FROM_WISHLIST } from '../../constants/WishListConstants';
import { ADD_TO_CART } from '../../constants/CartConstants'
import { Message, Rating } from '../../components';
import { Link } from 'react-router-dom';
import styles from './wishlist.module.css';

const WishList = () => {
    const { state: { wishlist, cart }, dispatch } = useCustomContext();
    const [qty, setQty] = useState(1);

    const removefromWishList = (id) => {
        dispatch({ type: REMOVE_FROM_WISHLIST, payload: id })
    }

    const addToCart = (item) => {
        const updateQtyProduct = { ...item, qty: qty }
        dispatch({ type: ADD_TO_CART, payload: updateQtyProduct })
    }

    const checkincart = (item) => {
        return !!cart.find((x) => x.id === item.id)
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
                                wishlist.map((item) => (
                                    <div key={item.id} className={styles.single_wishlist_card}>

                                        <div className={styles.wishlist_image_container}>
                                            <img src={item.image} className="wishlist_image" className={styles.wishlist_image} />
                                        </div>

                                        <div className={styles.wishlist_details_container}>
                                            <ul className="list-group">
                                                <li className={styles.list_item}><strong>{item.name}</strong></li>
                                                <li className={styles.list_item}>{item.description}</li>
                                                <li className={styles.list_item}>₹{item.price}</li>
                                                <li className={styles.list_item}><Rating value={item.rating} numReviews={item.numReviews} /></li>
                                                <li className={styles.list_item}>
                                                    <select value={qty} onChange={(e) => setQty((qty) => Number(e.target.value))} className="select-css">
                                                        {
                                                            [...Array(item.countInStock).keys()].map((count) => (
                                                                <option key={count} value={count + 1}>
                                                                    { count + 1}
                                                                </option>
                                                            ))
                                                        }
                                                    </select>
                                                </li>
                                                <li className={styles.list_item}>
                                                    {
                                                        checkincart(item) === true ?
                                                            <button disabled className="btn btn-success">Added to cart</button>
                                                            :
                                                            <button onClick={() => addToCart(item)} disabled={item.countInStock === 0} className="btn btn-info">Add to cart</button>
                                                    }
                                                </li>
                                                <li className={styles.list_item}><button className="btn btn-danger" onClick={() => removefromWishList(item.id)}>Remove</button></li>
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
