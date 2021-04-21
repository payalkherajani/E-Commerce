const express = require('express');
const router = express.Router();
const controller = require('../controllers/user.controller');
const { registerUser, loginUser, getUserByID } = controller;

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/:id', getUserByID);

module.exports = router;