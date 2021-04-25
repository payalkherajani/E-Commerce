const express = require('express');
const router = express.Router();
const controller = require('../controllers/cart.controller');
const { getCartByUserID, addIteminCart } = controller


router.get('/:id', getCartByUserID);
router.post('/:id', addIteminCart);

module.exports = router;