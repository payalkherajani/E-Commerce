import React, { useEffect, useState } from 'react';
import useCustomContext from '../../customHooks/Hook';
import { PRODUCTS_DETAILS_REQUEST, PRODUCTS_DETAILS_SUCCESS, PRODUCTS_DETAILS_FAILURE } from '../../constants/ProductConstants';
import axios from 'axios';
import { ADD_TO_CART } from '../../constants/CartConstants';
import { Loader, Message, Rating } from '../../components'
import style from './singleproduct.module.css';
import { Link } from 'react-router-dom';


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
        const updateQtyProduct = { ...product, qty: qty }
        dispatch({ type: ADD_TO_CART, payload: updateQtyProduct })
    }

    const checkincart = () => {
        return !!cart.find((item) => item.id === product.id)
    }

    const { name, description, countInStock, image, rating, numReviews, category, price } = product;

    return (
        <div className={style.single_product_container}>
            <Link to={{ pathname: '/products' }} className="padding-half"> <button className="btn btn-primary">Go Back</button> </Link>
            {
                loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (

                    <div className={style.single_product_card}>

                        <div className={style.single_product_image_container}>
                            <img src={image} alt="single-product-image" className={style.single_product_image} />
                        </div>

                        <div className={style.single_product_details_container}>
                            <ul className="list-group">
                                <li className={style.list_item}><strong>{name}</strong></li>
                                <li className={style.list_item}>{description}</li>
                                <li className={style.list_item}>{countInStock > 0 ? 'In Stock' : 'Out of Stock'}</li>
                                <li className={style.list_item}><Rating value={rating} numReviews={`${numReviews}`} /></li>
                                <li className={style.list_item}>
                                    <select value={qty} onChange={(e) => setQty((qty) => Number(e.target.value))} className="select-css">
                                        {
                                            [...Array(countInStock).keys()].map((count) => (
                                                <option key={count} value={count + 1}>
                                                    { count + 1}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </li>
                                <li className={style.list_item}>
                                    {
                                        checkincart() === true ?
                                            <button disabled className="btn btn-success">Added to cart</button>
                                            :
                                            <button onClick={() => addToCart()} disabled={countInStock === 0} className="btn btn-info">Add to cart</button>
                                    }
                                </li>
                            </ul>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default SingleProduct;

