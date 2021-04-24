const Cart = require('../models/cart.model');
const User = require('../models/user.model');
const Product = require('../models/product.model');


// @desc    Get All Products in Cart by USERID
// @route   GET /api/carts/:id
// @access  Public

const getAllProductsinCartByUserID = async (req, res) => {
    try {
        res.send("Working")
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

// @desc    Add Product in Cart
// @route   POST /api/carts
// @access  Public

const addIteminCart = async (req, res) => {
    try {

        const { user, productId, quantity } = req.body;

        //validate User
        const isUser = await User.findOne({ _id: user })
        if (!isUser) {
            return res.status(400).json({ success: false, message: "InValid User" })
        }

        //valid ProductID
        const isProductIDValid = await Product.findOne({ _id: productId });

        if (!isProductIDValid) {
            return res.status(400).json({ success: false, message: "InValid Product" })
        }

        const products = [{ productId, quantity }]


        //First product added to cart, so Cart for user is created here!
        const newCartItem = new Cart({
            user,
            productsinCart: products
        })

        const savedIteminCart = await newCartItem.save();

        res.status(200).send(savedIteminCart)

    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}


// @desc    Update Product in cart
// @route   POST /api/carts/:id
// @access  Public

const updateIteminCart = async (req, res) => {
    try {

        res.send("working");

    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}


module.exports = { getAllProductsinCartByUserID, addIteminCart, updateIteminCart }