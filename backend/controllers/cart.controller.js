const Cart = require('../models/cart.model');
const Product = require('../models/product.model');


// @desc    Get Cart by USERID
// @route   GET /api/carts/:id
// @access  Public

const getCartByUserID = async (req, res) => {
    try {
        const userId = req.user
        const findCart = await Cart.findOne({ user: userId }).populate('productsinCart.productId', [
            'name',
            'price',
            'description',
            'countInStock',
            'rating',
            'numReviews',
            'qty',
            'category'
        ]);
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

        const userId = req.user;

        const { productId, quantity } = req.body;

        //valid ProductID
        const isProductIDValid = await Product.findOne({ _id: productId });

        if (!isProductIDValid) {
            return res.status(400).json({ success: false, message: "InValid Product" })
        }

        const cart = await Cart.findOne({ user: userId });

        const isProductPresent = !!cart.productsinCart.find((p) => p.productId == productId)

        if (isProductPresent) {
            return res.status(200).send({ success: false, message: 'Product is Present in cart' })
        }

        const productToBeAdded = {
            productId,
            quantity
        }

        const products = [...cart.productsinCart, productToBeAdded]

        const updatedDetails = {
            user: cart.user,
            productsinCart: products
        }

        const updatedCart = await Cart.findOneAndUpdate({ _id: cart._id }, { $set: updatedDetails }, { new: true })

        res.status(200).send(updatedCart)

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

        const { productId } = req.params
        const { quantity } = req.body;
        const userId = req.user;

        const cart = await Cart.findOne({ user: userId });

        const { productsinCart } = cart;

        const updatedQuantity = productsinCart.map((product) => {
            if (product.productId == productId) {
                product.quantity = quantity;
            }
            return product
        })

        const updatedDetails = {
            user: cart.user,
            productsinCart: updatedQuantity
        }

        const updatedProductsQunatityinCart = await Cart.findOneAndUpdate({ _id: cart._id }, { $set: updatedDetails }, { new: true })

        return res.status(200).send(updatedProductsQunatityinCart);

    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

// @desc    Remove Product
// @route   DELETE /api/carts/:id/:productId
// @access  Public

const deleteProductFromCart = async (req, res) => {
    try {

        const { productId } = req.params;
        const userId = req.user;

        const cart = await Cart.findOne({ user: userId })

        const { productsinCart } = cart;

        const products = productsinCart.filter((p) => {
            return p.productId != productId
        })


        const updatedDetails = {
            user: cart.user,
            productsinCart: products
        }

        const updatedCart = await Cart.findOneAndUpdate({ _id: cart._id }, { $set: updatedDetails }, { new: true });

        res.status(200).send(updatedCart);
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}


module.exports = { getCartByUserID, addIteminCart, updateIteminCart, deleteProductFromCart }