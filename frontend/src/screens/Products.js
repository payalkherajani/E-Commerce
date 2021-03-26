import React, { useEffect, useContext } from 'react';
import Sidebar from '../components/Sidebar';
import useCustomContext from '../customHooks/Hook';
import axios from 'axios';
import { PRODUCTS_LIST_SUCCESS, PRODUCTS_LIST_FAILURE, PRODUCTS_LIST_REQUEST } from '../constants/ProductConstants';
import Loader from '../components/Loader';
import Message from '../components/Message';

const Products = () => {

    const { state, dispatch } = useCustomContext();
    const { loading, products, error } = state;

    const fetchProducts = async () => {
        try {
            dispatch({ type: PRODUCTS_LIST_REQUEST })
            const { data } = await axios.get('/api/products');
            dispatch({ type: PRODUCTS_LIST_SUCCESS, payload: data.products })
        } catch (err) {
            dispatch({ type: PRODUCTS_LIST_FAILURE, payload: 'Something went Wrong' })
        }
    }

    useEffect(() => {
        fetchProducts()
    }, []);

    return (
        <div className="container">
            <Sidebar />
            <div className="main">
                {
                    loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                        <ul>
                            <li>Hello</li>
                        </ul>
                    )
                }
            </div>
        </div>
    )
}

export default Products;