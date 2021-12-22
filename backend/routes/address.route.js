const express = require('express')
const { addNewAddress, deleteAddressWithID, editDetailsOfAddressWithID } = require('../controllers/address.controller')
const router = express.Router()


router.post('/', addNewAddress)
router.delete('/:addressId', deleteAddressWithID)
router.put('/:addressId', editDetailsOfAddressWithID)


module.exports = router