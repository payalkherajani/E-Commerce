import React from 'react'
import styles from './checkout.module.css'
import { Link } from 'react-router-dom'
import useCustomContext from '../../customHooks/Hook';

const Checkout = () => {

    const { state: { cart } } = useCustomContext()

    return (
        <div className={styles.checkout}>

            <Link to='/cart' className="padding-half">
                <button className="btn btn-primary margin-bottom-half">Go Back</button>
            </Link>

            <div className={styles.checkout_heading}><h1>Checkout</h1></div>

            <div>
                <table>

                    <thead>
                        <th>Product</th>
                        <th>Quantity</th>
                        <th>Price Per Piece</th>
                        <th>Total Price</th>
                    </thead>

                    <tbody>
                        {
                            cart.map(({ _id, productId: { name, price, image }, quantity }) => (
                                <tr key={_id} className={styles.checkout_wrapper}>

                                    <td>

                                        <img src={image} alt="cart-image" className="avatar avatar-lg" />

                                    </td>

                                    <td>{quantity}</td>
                                    <td>₹{price}</td>
                                    <td>₹{quantity * price}</td>


                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Checkout


