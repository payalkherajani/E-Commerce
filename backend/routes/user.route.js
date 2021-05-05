const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.middleware');
const controller = require('../controllers/user.controller');
const { registerUser, loginUser, getUserByID } = controller;

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/', auth, getUserByID);

module.exports = router;