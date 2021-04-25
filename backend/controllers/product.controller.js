const Product = require('../models/product.model');

// @desc    Get All Products
// @route   GET /api/products
// @access  Public

const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({})
        res.status(200).send(products)
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

// @desc    Add a Product
// @route   POST /api/products
// @access  Public

const addProduct = async (req, res) => {
    try {

        const { name, image, description, price, countInStock, rating, numReviews, qty, category } = req.body;

        const productDetails = new Product({
            name,
            image,
            description,
            price,
            countInStock,
            rating,
            numReviews,
            qty,
            category
        })

        const savedProduct = await productDetails.save();

        res.status(200).send(savedProduct)
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

// @desc    Get Product By ID
// @route   GET /api/products/:id
// @access  Public

const getProductByID = async (req, res) => {
    try {

        const { id } = req.params;
        const productexists = await Product.findById({ _id: id })

        if (!productexists) {
            return res.status(400).json({ success: false, message: 'No Product Found with this ID' })
        }

        return res.status(200).send(productexists)
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

// @desc    Update Product By ID
// @route   POST /api/products/:id
// @access  Public

const updateProductDetails = async (req, res) => {
    try {

        const { id } = req.params;

        let productexists = await Product.findById({ _id: id });

        if (!productexists) {
            return res.status(400).json({ success: false, message: 'No Product Found with this ID' })
        }

        const { name, image, description, price, countInStock, rating, numReviews, qty, category } = req.body;

        const newDetails = {
            name,
            image,
            description,
            price,
            countInStock,
            rating,
            numReviews,
            qty,
            category
        }

        productexists = await Product.findOneAndUpdate({ _id: id }, { $set: newDetails }, { new: true })
        return res.status(200).send(productexists)

    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

module.exports = { getAllProducts, addProduct, getProductByID, updateProductDetails }