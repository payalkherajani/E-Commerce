import React from 'react';
import { ADD_ITEM_TO_CART, REMOVE_FROM_CART } from '../../constants/type';
import useCustomContext from '../../customHooks/Hook';
import styles from './cart.module.css';
import { Link } from 'react-router-dom';
import { Message } from '../../components';
import { auth } from '../../utlis/auth';
import Config from '../../config/Config';
import axios from 'axios';
import { toast } from 'react-toastify';

const { serverUrl } = Config;

const Cart = () => {
    const token = auth();
    const { state: { cart }, dispatch } = useCustomContext();

    const removefromcart = async (id) => {
        try {
            const response = await axios.delete(`${serverUrl}/api/carts/${id}`, { headers: token })
            dispatch({ type: REMOVE_FROM_CART, payload: response.data.productsinCart })
        } catch (err) {
            const error = err.response.data.message;
            toast.error(`${error}`);
        }
    }

    const addIteminCart = async (e, id) => {
        try {
            const newQty = Number(e.target.value);
            const { data } = await axios.post(`${serverUrl}/api/carts/${id}`, { 'quantity': newQty }, { headers: token })
            dispatch({ type: ADD_ITEM_TO_CART, payload: data.productsinCart })
        } catch (err) {
            const error = err.response.data.message;
            toast.error(`${error}`);
        }
    }

    return (
        <div className={styles.cart_container}>
            <Link to='/products' className="padding-half"><button className="btn btn-primary margin-bottom-half">Go Back</button></Link>
            <div className={styles.cart_heading}><h1>Aapka Cart</h1></div>
            {
                cart.length === 0 ?
                    (<Message>Your Cart is Empty</Message>)
                    :
                    (
                        <div className={styles.single_cart_container}>
                            <h3 className={styles.cart_heading}>Total price ₹{cart.reduce((acc, item) => acc + item.productId.price * item.quantity, 0)}</h3>
                            {
                                cart.map(({ _id, productId: { name, price, _id: id, countInStock, image }, quantity }) => (
                                    <div key={_id} className={styles.single_card_cart} >

                                        <div className={styles.single_cart_image_container}>
                                            <img src={image} alt="cart-image" className={styles.cart_image} />
                                        </div>

                                        <div className={styles.single_cart_details}>
                                            <ul className="list-group">
                                                <li className={styles.list_item}> <strong>{name} </strong></li>
                                                <li className={styles.list_item}>₹{price}</li>
                                                <li className={styles.list_item}>
                                                    <select value={quantity} onChange={(e) => addIteminCart(e, id)} className="select-css">
                                                        {
                                                            [...Array(countInStock).keys()].map((count) => (
                                                                <option key={count} value={count + 1}>
                                                                    { count + 1}
                                                                </option>
                                                            ))
                                                        }
                                                    </select>
                                                </li>
                                                <li className={styles.list_item}><button onClick={() => removefromcart(id)} className="btn btn-danger">Delete</button></li>
                                            </ul>
                                        </div>
                                    </div>
                                ))
                            }
                        </div>
                    )

            }
        </div>
    )
}

export default Cart;
