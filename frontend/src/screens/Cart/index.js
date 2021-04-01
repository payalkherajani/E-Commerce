import React from 'react';
import { ADD_ITEM_TO_CART, REMOVE_FROM_CART } from '../../constants/CartConstants';
import useCustomContext from '../../customHooks/Hook';
import styles from './cart.module.css';
import { Link } from 'react-router-dom';
import { Message } from '../../components';

const Cart = () => {

    const { state: { cart }, dispatch } = useCustomContext();

    const removefromcart = (id) => {
        dispatch({ type: REMOVE_FROM_CART, payload: id })
    }

    const addIteminCart = (e, id) => {
        const newQty = Number(e.target.value);
        dispatch({ type: ADD_ITEM_TO_CART, payload: { newQty, id } })
    }

    return (
        <div className={styles.cart_container}>
            <Link to='/products' className="p-half"><button className="btn btn-primary m-b-half">Go Back</button></Link>
            <div className={styles.cart_heading}><h1>Aapka Cart</h1></div>
            {
                cart.length === 0 ?
                    (<Message>Your Cart is Empty</Message>)
                    :
                    (
                        <div className={styles.single_cart_container}>
                            <h3 className={styles.cart_heading}>Total price ₹{cart.reduce((acc, item) => acc + item.price * item.qty, 0)}</h3>
                            {
                                cart.map(({ name, price, qty, id, countInStock, image }) => (
                                    <div key={id} className={styles.single_card_cart} >

                                        <div className={styles.single_cart_image_container}>
                                            <img src={image} alt="cart-image" className={styles.cart_image} />
                                        </div>

                                        <div className={styles.single_cart_details}>
                                            <ul className="list-group">
                                                <li className={styles.list_item}> <strong>{name} </strong></li>
                                                <li className={styles.list_item}>₹{price}</li>
                                                <li className={styles.list_item}>
                                                    <select value={qty} onChange={(e) => addIteminCart(e, id)} className="select-css">
                                                        {
                                                            [...Array(countInStock).keys()].map((x) => (
                                                                <option key={x} value={x + 1}>
                                                                    { x + 1}
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



{/* <ul>
                {
                    cart.map((item) => (
                        <Fragment key={item.id}>
                            <li>{item.name}</li>
                            <li>{item.price}</li>
                            <li><button onClick={() => removefromcart(item.id)}>Delete</button></li>
                            <li>
                                <select value={item.qty} onChange={(e) => addIteminCart(e, item.id)}>
                                    {
                                        [...Array(item.countInStock).keys()].map((x) => (
                                            <option key={x} value={x + 1}>
                                                { x + 1}
                                            </option>
                                        ))
                                    }
                                </select>
                            </li>
                        </Fragment>
                    ))
                }
            </ul> */}