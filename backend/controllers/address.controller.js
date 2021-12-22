const Address = require('../models/address.model')


const addNewAddress = async (req, res) => {
    try {
        const userId = req.user
        let addressofUser = await Address.findOne({ user: userId })
        const { city, street, pincode, country } = req.body
        if (!city || !street || !pincode || !country) {
            return res.status(400).json({ success: false, message: "Missing required fields" })
        }

        if (addressofUser === null) {
            const newAddress = new Address({
                user: userId,
                address: [{
                    city,
                    street,
                    pincode,
                    country
                }]
            })
            const activeAddress = await newAddress.save()
            return res.status(200).json({ success: true, message: 'Added a New Address', activeAddress })
        }
        else {

            addressofUser = addressofUser.address.map((add) => {
                if (add.is_active) {
                    add.is_active = false
                }
                return add
            })

            const addExtraAddresses = {
                user: userId,
                address: [...addressofUser, { city, street, pincode, country }]
            }

            const activeAddress = await Address.findOneAndUpdate({ user: userId }, { $set: addExtraAddresses }, { new: true })
            return res.status(200).json({ success: true, message: 'Added a New Address', activeAddress })
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({ success: false, message: 'Server Error' })
    }

}

const editDetailsOfAddressWithID = async (req, res) => {
    try {
        const { addressId } = req.params
        const { city, street, pincode, country, is_active } = req.body
        const userId = req.user
        const alladdress = await Address.findOne({ user: userId })
        const updateAddress = alladdress.address.map((a) => {

            if (a._id == addressId) {
                if (city) {
                    a.city = city
                }
                if (street) {
                    a.street = street
                }
                if (pincode) {
                    a.pincode = pincode
                }
                if (country) {
                    a.country = country
                }
                if (is_active !== null) {
                    a.is_active = is_active
                }
                return a
            }
            else {
                if (a.is_active) {
                    a.is_active = false
                }
                return a
            }
        })
        const editedAddress = await Address.findOneAndUpdate({ user: userId }, { $set: { user: userId, address: updateAddress } }, { new: true })
        return res.status(200).json({ success: true, editedAddress })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ success: false, message: 'Server Error' })
    }
}

const deleteAddressWithID = async (req, res) => {
    try {
        const userId = req.user
        const allAddress = await Address.findOne({ user: userId })
        const { addressId } = req.params
        const updatedAddress = allAddress.address.filter((a) => a._id != addressId)
        const removedAddress = await Address.findOneAndUpdate({ user: userId }, { $set: { user: userId, address: updatedAddress } }, { new: true })
        res.status(200).json({ success: true, removedAddress })
    } catch (err) {
        console.log(err)
        return res.status(500).json({ success: false, message: 'Server Error' })
    }
}
module.exports = { addNewAddress, editDetailsOfAddressWithID, deleteAddressWithID }

