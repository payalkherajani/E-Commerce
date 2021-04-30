import React, { Fragment, useEffect } from 'react';
import useCustomContext from '../../customHooks/Hook';
import axios from 'axios';
import { PRODUCTS_LIST_SUCCESS, PRODUCTS_LIST_FAILURE, PRODUCTS_LIST_REQUEST } from '../../constants/ProductConstants';
import { Loader, Sidebar, Message, Card, Searchbar } from '../../components';
import { PRICE_HIGH_TO_LOW, PRICE_LOW_TO_HIGH } from '../../constants/FilterConstants';
import Config from '../../config/Config';
const { serverUrl } = Config

const Products = () => {

    const { state, dispatch } = useCustomContext();
    const { loading, products, error } = state;

    const fetchProducts = async () => {
        try {
            dispatch({ type: PRODUCTS_LIST_REQUEST })
            const { data } = await axios.get(`${serverUrl}/api/products`);
            dispatch({ type: PRODUCTS_LIST_SUCCESS, payload: data })
        } catch (err) {
            dispatch({ type: PRODUCTS_LIST_FAILURE, payload: 'Something went Wrong' })
        }
    }

    useEffect(() => {
        fetchProducts()
    }, []);


    // const fetchProductsinWishlist = async() => {
    //   try {
    //       const productsinWishlist = await axios.get(`${serverUrl}/`)
    //   } catch (err) {
    //       console.log(err);
    //   }
    // }

    // useEffect(() => {
    //   fetchProductsinWishlist()
    // },[])

    const getSortedData = (state, products) => {

        let sortedProducts = [...products];

        if (state.sortBy === PRICE_HIGH_TO_LOW) {
            sortedProducts = sortedProducts.sort((a, b) => b.price - a.price);
        }
        if (state.sortBy === PRICE_LOW_TO_HIGH) {
            sortedProducts = sortedProducts.sort((a, b) => a.price - b.price);
        }
        if (state.keyword) {
            sortedProducts = sortedProducts.filter((x) => x.name.toLowerCase().includes(state.keyword));
        }
        if (state.sortBy === '' || state.keyword === '') {
            sortedProducts = sortedProducts
        }

        return sortedProducts;
    }

    const sortedProducts = getSortedData(state, products);

    return (
        <>
            <div className="container">
                <Sidebar />
                <div className="main m-0 margin-left-1">
                    <Searchbar />
                    {
                        loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
                            <ul className="display-flex wrap">
                                {
                                    sortedProducts.map((product) => (
                                        <Fragment key={product._id} >
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