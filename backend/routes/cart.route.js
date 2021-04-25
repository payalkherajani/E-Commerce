const express = require('express');
const router = express.Router();
const controller = require('../controllers/cart.controller');
const { getCartByUserID, addIteminCart, updateIteminCart, deleteProductFromCart } = controller


router.get('/:id', getCartByUserID);
router.post('/:id', addIteminCart);
router.post('/:cartId/:productId', updateIteminCart);
router.delete('/:cartId/:productId', deleteProductFromCart);

module.exports = router;