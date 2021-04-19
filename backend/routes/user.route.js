const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');
const { registerUser } = controller;

router.get('/register', registerUser);

module.exports = router;