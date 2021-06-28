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
            let allAddress = await Address.findOne({ user: userId })

            allAddress = allAddress.address.map((address) => {
                if (address.is_active) {
                    address.is_active = false
                }
                return address
            })

            const addExtraAddresses = {
                user: userId,
                address: [...allAddress, { city, street, pincode, country }]
            }
            const activeAddress = await Address.findOneAndUpdate({ user: userId }, { $set: addExtraAddresses }, { new: true })
            return res.status(200).json({ success: true, message: 'Added a New Address', activeAddress })
        }
    } catch (err) {
        console.log(err)
        return res.status(500).json({ success: false, message: 'Server Error' })
    }

}
module.exports = { addNewAddress }

