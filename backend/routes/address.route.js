const express = require('express')
const { addNewAddress } = require('../controllers/address.controller')
const router = express.Router()


router.post('/', addNewAddress)


module.exports = router