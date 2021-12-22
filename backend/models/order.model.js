const mongoose = require('mongoose');
const { Schema } = mongoose;

const orderSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        },

        product: {
            type: Schema.Types.ObjectId,
            ref: 'product'
        },

        order_date: {
            type: Date,
        },

        order_number: {
            type: String,
        },

        order_status: {
            type: String,
            enum: ['Processing', 'Complete', 'Cancelled', 'Declined'],
            required: false,
        },

        quantity: {
            type: Number,
            required: true
        },

        price: {
            type: Number
        },

        is_active: {
            type: Boolean,
            default: true
        }
    }
    ,
    {
        timestamps: true
    }

)

const Order = mongoose.model('order', orderSchema);

module.exports = Order;