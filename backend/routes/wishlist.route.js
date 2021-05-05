const express = require('express');
const router = express.Router();
const controller = require('../controllers/wishlist.controller');

const { getWishlistByUserID, addIteminwishlist, deleteProductFromwishlist } = controller;

router.get('/', getWishlistByUserID);
router.post('/', addIteminwishlist);
router.delete('/:productId', deleteProductFromwishlist);

module.exports = router;