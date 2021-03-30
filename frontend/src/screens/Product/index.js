import React, { Fragment, useEffect } from 'react';
import useCustomContext from '../../customHooks/Hook';
import axios from 'axios';
import { PRODUCTS_LIST_SUCCESS, PRODUCTS_LIST_FAILURE, PRODUCTS_LIST_REQUEST } from '../../constants/ProductConstants';
import { Loader, Sidebar, Message, Card, Searchbar } from '../../components';
import { PRICE_HIGH_TO_LOW } from '../../constants/FilterConstants';

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

    // const getSortedData = (state,data) => {
    //   if(state.sortBy === PRICE_HIGH_TO_LOW){
    //        return aaray
    //   }
    // }

    // const sortedData = getSortedData(state,products);
    return (
        <>
            <div className="container">
                <Sidebar />
                <div className="main m-0 m-l-1">
                    <Searchbar />
                    {
                        loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                            <ul className="d-flex wrap">
                                {
                                    products.map((product) => (
                                        <Fragment key={product.id} >
                                            <Card product={product} />
                                        </Fragment>
                                    ))
                                }
                            </ul>
                        )
                    }
                </div>
            </div>
        </>

    )
}

export default Products;