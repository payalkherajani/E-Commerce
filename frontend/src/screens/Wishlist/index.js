import React from 'react';
import useCustomContext from '../../customHooks/Hook';
import { REMOVE_FROM_WISHLIST } from '../../constants/WishListConstants';
import { Message, Rating } from '../../components';
import { Link } from 'react-router-dom';
import styles from './wishlist.module.css';

const WishList = () => {
    const { state: { wishlist }, dispatch } = useCustomContext();

    const removefromWishList = (id) => {
        dispatch({ type: REMOVE_FROM_WISHLIST, payload: id })
    }

    return (
        <div className={styles.wishlist_container}>
            <Link to='/products' className="p-half"><button className="btn btn-primary m-b-half">Go Back</button></Link>

            {
                wishlist.length === 0 ?
                    (<Message>Your Wishlist is Empty</Message>)
                    :
                    (
                        <div className={styles.wishlist_card}>
                            {
                                wishlist.map(({ id, name, description, image, price, numReviews, rating }) => (
                                    <div key={id} className={styles.single_wishlist_card}>

                                        <div className={styles.wishlist_image_container}>
                                            <img src={image} className="wishlist_image" className={styles.wishlist_image} />
                                        </div>

                                        <div className={styles.wishlist_details_container}>
                                            <ul className="list-group">
                                                <li className={styles.list_item}><strong>{name}</strong></li>
                                                <li className={styles.list_item}>{description}</li>
                                                <li className={styles.list_item}>₹{price}</li>
                                                <li className={styles.list_item}><Rating value={rating} numReviews={numReviews} /></li>
                                                <li className={styles.list_item}><button className="btn btn-danger" onClick={() => removefromWishList(id)}>Remove</button></li>
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
