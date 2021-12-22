const mongoose = require('mongoose');
const { Schema } = mongoose;

const cartSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        },

        productsinCart: [
            {
                productId: {
                    type: Schema.Types.ObjectId,
                    ref: 'product'
                },
                quantity: {
                    type: Number
                }
            }
        ]
    },
    {
        timestamps: true
    }
)

const Cart = mongoose.model('cart', cartSchema)

module.exports = Cart;