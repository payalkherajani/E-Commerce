const mongoose = require('mongoose')
const { Schema } = mongoose

const addressSchema = new Schema({
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    address: [
        {
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
            },
            is_active: {
                type: Boolean,
                required: true,
                default: true
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