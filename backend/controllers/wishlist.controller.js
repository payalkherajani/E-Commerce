const Wishlist = require('../models/wishlist.model');
const Product = require('../models/product.model');


// @desc    Get wishlist by USERID
// @route   GET /api/wishlists/:id
// @access  Public

const getWishlistByUserID = async (req, res) => {
    try {
        const { id } = req.params;
        const findwishlist = await Wishlist.findOne({ user: id }).populate('productsinWishlist.productId', [
            'name',
            'price',
            'description',
            'countInStock',
            'rating',
            'numReviews',
            'qty',
            'category'
        ]);;
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

        const { id } = req.params; //wishlistID

        const { productId, quantity } = req.body;

        //valid ProductID
        const isProductIDValid = await Product.findOne({ _id: productId });

        if (!isProductIDValid) {
            return res.status(400).json({ success: false, message: "InValid Product" })
        }

        const wishlist = await Wishlist.findOne({ _id: id });

        const productToBeAdded = {
            productId,
            quantity
        }

        const products = [...wishlist.productsinWishlist, productToBeAdded]

        const updatedDetails = {
            user: wishlist.user,
            productsinWishlist: products
        }

        const updatedwishlist = await Wishlist.findOneAndUpdate({ _id: id }, { $set: updatedDetails }, { new: true })

        res.status(200).send(updatedwishlist)

    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}


// @desc    Update Qunatity of Product in wishlist
// @route   POST /api/wishlists/:id
// @access  Public

const updateIteminwishlist = async (req, res) => {
    try {

        const { wishlistId, productId } = req.params
        const { quantity } = req.body;

        const wishlist = await Wishlist.findOne({ _id: wishlistId });

        const { productsinWishlist } = wishlist;

        const updatedQuantity = productsinWishlist.map((product) => {
            if (product.productId == productId) {
                product.quantity = quantity;
            }
            return product
        })

        const updatedDetails = {
            user: wishlist.user,
            productsinWishlist: updatedQuantity
        }

        const updatedProductsQunatityinwishlist = await Wishlist.findOneAndUpdate({ _id: wishlistId }, { $set: updatedDetails }, { new: true })

        return res.status(200).send(updatedProductsQunatityinwishlist);

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

        const { wishlistId, productId } = req.params;

        const wishlist = await Wishlist.findOne({ _id: wishlistId })

        const { productsinWishlist } = wishlist;

        const products = productsinWishlist.filter((p) => {
            return p.productId != productId
        })


        const updatedDetails = {
            user: wishlist.user,
            productsinWishlist: products
        }

        const updatedwishlist = await Wishlist.findOneAndUpdate({ _id: wishlistId }, { $set: updatedDetails }, { new: true });

        res.status(200).send(updatedwishlist);
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Server Error" });
    }
}


module.exports = { getWishlistByUserID, addIteminwishlist, updateIteminwishlist, deleteProductFromwishlist }