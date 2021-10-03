const express = require('express');
const router = express.Router();
const controller = require('../controllers/cart.controller');
const {
    getCartByUserID,
    addIteminCart,
    updateIteminCart,
    deleteProductFromCart,
    emptyCartWhenCheckout
} = controller


router.get('/', getCartByUserID);
router.post('/', addIteminCart);
router.post('/:productId', updateIteminCart);
router.delete('/:productId', deleteProductFromCart);
router.put('/', emptyCartWhenCheckout)

module.exports = router;