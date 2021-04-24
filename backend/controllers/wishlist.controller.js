const Wishlist = require('../models/wishlist.model');


const addToWishlist = async (req, res) => {
    try {

        res.send("Working")

    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Server Error" })
    }
}



module.exports = { addToWishlist }