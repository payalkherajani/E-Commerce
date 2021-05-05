const Wishlist = require('../models/wishlist.model');
const Product = require('../models/product.model');

// @desc    Get wishlist by USERID
// @route   GET /api/wishlists/:id
// @access  Public

const getWishlistByUserID = async (req, res) => {
    try {

        const userId = req.user;
        const findwishlist = await Wishlist.findOne({ user: userId }).populate('productsinWishlist.productId', [
            'name',
            'price',
            'description',
            'countInStock',
            'rating',
            'numReviews',
            'qty',
            'category',
            'image'
        ]);
        if (!findwishlist) {
            return res.status(400).json({ success: false, message: "Wishlist not Found" })
        }
        res.status(200).send(findwishlist);
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

// @desc    Add Product in wishlist
// @route   POST /api/wishlists
// @access  Public

const addIteminwishlist = async (req, res) => {
    try {

        const userId = req.user;

        const { productId, quantity } = req.body;

        //valid ProductID
        const isProductIDValid = await Product.findOne({ _id: productId });

        if (!isProductIDValid) {
            return res.status(400).json({ success: false, message: "InValid Product" })
        }

        const wishlist = await Wishlist.findOne({ user: userId });

        const isProductPresent = !!wishlist.productsinWishlist.find((p) => p.productId == productId)

        if (isProductPresent) {
            return res.status(200).send({ success: false, message: 'Product is Present in wishlist' })
        }

        const productToBeAdded = {
            productId,
            quantity
        }

        const products = [...wishlist.productsinWishlist, productToBeAdded]

        const updatedDetails = {
            user: wishlist.user,
            productsinWishlist: products
        }

        const updatedwishlist = await Wishlist.findOneAndUpdate({ _id: wishlist._id }, { $set: updatedDetails }, { new: true }).populate('productsinWishlist.productId', [
            'name',
            'price',
            'description',
            'countInStock',
            'rating',
            'numReviews',
            'qty',
            'category',
            'image'
        ])

        res.status(200).send(updatedwishlist)

    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}

// @desc    Remove Product
// @route   DELETE /api/wishlists/:id/:productId
// @access  Public

const deleteProductFromwishlist = async (req, res) => {
    try {

        const { productId } = req.params;
        const userId = req.user;

        const wishlist = await Wishlist.findOne({ user: userId })

        const { productsinWishlist } = wishlist;

        const products = productsinWishlist.filter((p) => {
            return p.productId != productId
        })

        const updatedDetails = {
            user: userId,
            productsinWishlist: products
        }

        const updatedwishlist = await Wishlist.findOneAndUpdate({ _id: wishlist._id }, { $set: updatedDetails }, { new: true }).populate('productsinWishlist.productId', [
            'name',
            'price',
            'description',
            'countInStock',
            'rating',
            'numReviews',
            'qty',
            'category',
            'image'
        ]);

        res.status(200).send(updatedwishlist);
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}


module.exports = { getWishlistByUserID, addIteminwishlist, deleteProductFromwishlist }