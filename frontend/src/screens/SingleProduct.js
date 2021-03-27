import React, { Fragment, useEffect, useState } from 'react';
import useCustomContext from '../customHooks/Hook';
import { PRODUCTS_DETAILS_REQUEST, PRODUCTS_DETAILS_SUCCESS, PRODUCTS_DETAILS_FAILURE } from '../constants/ProductConstants';
import axios from 'axios';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { ADD_TO_CART } from '../constants/CartConstants';
import { Link } from 'react-router-dom'

const SingleProduct = ({ match: { params: { id } } }) => {
    const { state, dispatch } = useCustomContext();
    const { product, loading, error, cart } = state;
    const [qty, setQty] = useState(1);

    const fetchSingleProductDetails = async () => {
        try {
            dispatch({ type: PRODUCTS_DETAILS_REQUEST });
            const { data } = await axios.get(`/api/product/${id}`);
            dispatch({ type: PRODUCTS_DETAILS_SUCCESS, payload: data.products })
        } catch (err) {
            dispatch({ type: PRODUCTS_DETAILS_FAILURE, payload: 'Something went wrong' })
        }
    }

    useEffect(() => {
        fetchSingleProductDetails()
    }, [])

    const addToCart = () => {
        dispatch({ type: ADD_TO_CART, payload: product })
    }

    const checkincart = () => {
        return !!cart.find((x) => x.id === product.id)
    }

    return (
        <Fragment>
            {
                loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                    <ul className="d-flex wrap">
                        <li>{product.name}</li>
                        <li>{product.description}</li>
                        <li>{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}</li>
                        <li>
                            <select value={qty} onChange={(e) => setQty((qty) => Number(e.target.value))}>
                                {
                                    [...Array(product.countInStock).keys()].map((x) => (
                                        <option key={x} value={x + 1}>
                                            { x + 1}
                                        </option>
                                    ))
                                }
                            </select>
                        </li>
                        <li>
                            {
                                checkincart() === true ?
                                    <button disabled>Added to cart already</button>
                                    :
                                    <Link to={{ pathname: '/cart', state: qty }}><button onClick={addToCart} disabled={product.countInStock === 0}>Add to cart</button></Link>
                            }
                        </li>
                    </ul>
                )
            }
        </Fragment>
    )
}

export default SingleProduct;