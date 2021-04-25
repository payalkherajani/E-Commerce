const express = require('express');
const router = express.Router();
const controller = require('../controllers/cart.controller');
const { getCartByUserID, addIteminCart, updateIteminCart } = controller


router.get('/:id', getCartByUserID);
router.post('/:id', addIteminCart);
router.post('/:cartId/:productId', updateIteminCart);

module.exports = router;