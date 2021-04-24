const express = require('express');
const router = express.Router();
const controller = require('../controllers/category.controller');
const { addCategory, getCategoryByID, getAllCategories } = controller;

router.post('/', addCategory);
router.get('/:id', getCategoryByID);
router.get('/', getAllCategories);

module.exports = router;