const express = require('express');
const router = express.Router();
const controller = require('../controllers/wishlist.controller');

const { getWishlistByUserID, addIteminwishlist, updateIteminwishlist, deleteProductFromwishlist } = controller;

router.get('/:id', getWishlistByUserID);
router.post('/:id', addIteminwishlist);
router.post('/:wishlistId/:productId', updateIteminwishlist);
router.delete('/:wishlistId/:productId', deleteProductFromwishlist);

module.exports = router;