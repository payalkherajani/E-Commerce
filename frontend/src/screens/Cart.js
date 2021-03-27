import React, { Fragment } from 'react';
import { ADD_ITEM_TO_CART, REMOVE_FROM_CART } from '../constants/CartConstants';
import useCustomContext from '../customHooks/Hook';


const Cart = () => {

    const { state: { cart }, dispatch } = useCustomContext();

    const removefromcart = (id) => {
        dispatch({ type: REMOVE_FROM_CART, payload: id })
    }

    const addIteminCart = (e, id) => {
        const newQty = Number(e.target.value);
        dispatch({ type: ADD_ITEM_TO_CART, payload: { newQty, id } })
    }

    console.log({ cart });
    return (
        <div>
            <h1>Items in cart {cart.length}</h1>
            <h1>Total price {cart.reduce((acc, item) => acc + item.price * item.qty, 0)}</h1>
            <ul>
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
            </ul>

        </div>
    )
}
export default Cart;