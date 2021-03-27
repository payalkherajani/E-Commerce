import React, { Fragment, useEffect } from 'react';
import useCustomContext from '../customHooks/Hook';
import { PRODUCTS_DETAILS_REQUEST, PRODUCTS_DETAILS_SUCCESS, PRODUCTS_DETAILS_FAILURE } from '../constants/ProductConstants';
import axios from 'axios';

const SingleProduct = ({ match: { params: { id } } }) => {

    const { state, dispatch } = useCustomContext();
    const { product, loading, error } = state;

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

    console.log(state, "state");

    return (
        <Fragment>
            HELLO I AM IN
        </Fragment>
    )
}

export default SingleProduct;