const express = require('express');
const router = express.Router();
const controller = require('../controllers/cart.controller');
const { getAllProductsinCartByUserID, addIteminCart } = controller


router.get('/:id', getAllProductsinCartByUserID);
router.post('/', addIteminCart);

module.exports = router;