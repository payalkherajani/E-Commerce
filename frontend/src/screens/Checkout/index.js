import React, { useState } from 'react'
import styles from './checkout.module.css'
import { Link } from 'react-router-dom'
import useCustomContext from '../../customHooks/Hook';
import { CLEAR_CART } from '../../constants/type';

const Checkout = () => {

    const { state: { cart }, dispatch } = useCustomContext()

    const [showThankyouDialog, setThankyouDialog] = useState(false)

    const showThankYouMessage = () => {
        setThankyouDialog(true)
        dispatch({ type: CLEAR_CART })   // need to call api for updating in database as well, dummy for now
    }

    return (
        <div className={styles.checkout}>
            {
                showThankyouDialog === true ? (
                    <div className={styles.thank_you_container}>
                        <div className={styles.thank_you_box}>
                            <h1>Thank you!</h1>
                            <p className={styles.lead}>for shopping with Safarnama!</p>
                            <p>You should be recieving your products within 7 working days on your mentioned address!</p>
                            <p className={styles.signature}>♥️ Safarnama</p>
                            <Link to="/products"><button className="btn btn-info">See More Products</button></Link>
                        </div>
                    </div>
                ) : (
                    <>
                        <Link to='/cart' className="padding-half">
                            <button className="btn btn-primary margin-bottom-half">Go Back</button>
                        </Link>

                        <div className={styles.checkout_heading}><h1>Checkout</h1></div>

                        <div className={styles.checkout_table_container}>
                            <table id={styles.checkout_table}>

                                <thead>
                                    <th>Product</th>
                                    <th>Quantity</th>
                                    <th>Price Per Piece</th>
                                    <th>Total Price</th>
                                </thead>

                                <tbody>
                                    {
                                        cart.map(({ _id, productId: { price, image }, quantity }) => (
                                            <tr key={_id} className={styles.checkout_wrapper}>
                                                <td><img src={image} alt="cart-image" className="avatar avatar-lg" /></td>
                                                <td>{quantity}</td>
                                                <td>₹{price}</td>
                                                <td>₹{quantity * price}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                                <tfoot>
                                    <tr>
                                        <th scope="row" ></th>
                                        <th scope="row" >Total</th>
                                        <th scope="row" ></th>
                                        <td>₹{cart.reduce((acc, item) => acc + item.productId.price * item.quantity, 0)}</td>
                                    </tr>
                                </tfoot>
                            </table>

                            <div>
                                <button className="btn btn-info" onClick={showThankYouMessage}>Place Order</button>
                            </div>
                        </div>
                    </>
                )
            }
        </div>
    )
}

export default Checkout


