import React, { Fragment, useEffect } from 'react';
import useCustomContext from '../../customHooks/Hook';
import axios from 'axios';
import { Loader, Sidebar, Message, Card, Searchbar } from '../../components';
import Config from '../../config/Config';
import { auth } from '../../utlis/auth';
import { GET_CART_DATA, GET_WISHLIST_DATA, PRICE_HIGH_TO_LOW, PRICE_LOW_TO_HIGH, PRODUCTS_LIST_SUCCESS, PRODUCTS_LIST_FAILURE, PRODUCTS_LIST_REQUEST, FETCH_USER_DETAILS } from '../../constants/type';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const { serverUrl } = Config

const Products = () => {

    const { state, dispatch } = useCustomContext();
    const { loading, products, error } = state;
    const token = auth();

    const fetchProducts = async () => {
        try {
            dispatch({ type: PRODUCTS_LIST_REQUEST })
            const { data } = await axios.get(`${serverUrl}/api/products`, { headers: token });
            dispatch({ type: PRODUCTS_LIST_SUCCESS, payload: data })
        } catch (err) {
            dispatch({ type: PRODUCTS_LIST_FAILURE, payload: 'Something went Wrong' })
            const error = err.response.data.message;
            toast.error(`${error}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });

        }
    }

    useEffect(() => {
        fetchProducts()
    }, []);


    const fetchProductsinWishlist = async () => {
        try {
            const { data: { productsinWishlist } } = await axios.get(`${serverUrl}/api/wishlists`, { headers: token });
            dispatch({ type: GET_WISHLIST_DATA, payload: productsinWishlist })
        } catch (err) {
            const error = err.response.data.message;
            toast.error(`${error}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    useEffect(() => {
        fetchProductsinWishlist()
    }, [])

    const fetchCartProducts = async () => {
        try {
            const { data: { productsinCart } } = await axios.get(`${serverUrl}/api/carts`, { headers: token });
            dispatch({ type: GET_CART_DATA, payload: productsinCart })
        } catch (err) {
            const error = err.response.data.message;
            toast.error(`${error}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }


    useEffect(() => {
        fetchCartProducts()
    }, [])

    const fetchUserDetails = async () => {
        try {
            const { data } = await axios.get(`${serverUrl}/api/users`, { headers: token });
            dispatch({ type: FETCH_USER_DETAILS, payload: data })
        } catch (err) {
            const error = err.response.data.message;
            toast.error(`${error}`, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }

    useEffect(() => {
        fetchUserDetails()
    }, [])

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

                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
            </div>
        </>

    )
}

export default Products;