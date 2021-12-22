const express = require('express');
const router = express.Router();
const controller = require('../controllers/product.controller');
const { getAllProducts, addProduct, getProductByID, updateProductDetails } = controller;

router.get('/', getAllProducts);
router.post('/', addProduct);
router.get('/:id', getProductByID);
router.post('/:id', updateProductDetails);


module.exports = router;