const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');
const { registerUser, loginUser } = controller;

router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;