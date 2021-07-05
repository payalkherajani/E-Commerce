const express = require('express')
const { addNewAddress, deleteAddressWithID } = require('../controllers/address.controller')
const router = express.Router()


router.post('/', addNewAddress)
router.delete('/:addressId', deleteAddressWithID)


module.exports = router