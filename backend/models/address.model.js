const mongoose = require('mongoose')
const { Schema } = mongoose

const addressSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    address: [
        {
            delivery_address: {
                type: Boolean,
                default: true,
                required: true
            },
            city: {
                type: String,
                required: true
            },
            street: {
                type: String,
                required: true
            },
            pincode: {
                type: Number,
                required: true
            },
            country: {
                type: String,
                required: true
            }

        }
    ]
},
    {
        timestamps: true
    }
)

const Address = mongoose.model('address', addressSchema)

module.exports = Address