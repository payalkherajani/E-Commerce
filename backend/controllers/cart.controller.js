const Cart = require('../models/cart.model');
const User = require('../models/user.model');
const Product = require('../models/product.model');


// @desc    Get Cart by USERID
// @route   GET /api/carts/:id
// @access  Public

const getCartByUserID = async (req, res) => {
    try {
        const { id } = req.params;
        const findCart = await Cart.findOne({ user: id });
        if (!findCart) {
            return res.status(400).json({ success: false, message: "Cart not Found" })
        }
        res.status(200).send(findCart);
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

        const { id } = req.params; //cartID

        const { productId, quantity } = req.body;

        //valid ProductID
        const isProductIDValid = await Product.findOne({ _id: productId });

        if (!isProductIDValid) {
            return res.status(400).json({ success: false, message: "InValid Product" })
        }

        const cart = await Cart.findOne({ _id: id });

        const productToBeAdded = {
            productId,
            quantity
        }

        const products = [...cart.productsinCart, productToBeAdded]

        res.status(200).send("Valid user and product")

    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}


// @desc    Update Qunatity of Product in cart
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


module.exports = { getCartByUserID, addIteminCart, updateIteminCart }