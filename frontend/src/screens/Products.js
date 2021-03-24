import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import axios from 'axios';


const Products = () => {

    const fetchProductsData = async () => {
        try {
            const { data } = await axios.get('/api/products');
            console.log(data);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchProductsData()
    }, []);

    return (
        <div className="container">
            <Sidebar />
            <div className="main">

            </div>
        </div>
    )
}

export default Products;