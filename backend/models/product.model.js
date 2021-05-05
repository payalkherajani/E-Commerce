const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema(
    {
        category: {
            type: Schema.Types.ObjectId,
            ref: 'category'
        },
        name: {
            type: String
        },

        image: {
            type: String
        },

        description: {
            type: String
        },

        price: {
            type: Number
        },

        countInStock: {
            type: Number
        },

        rating: {
            type: Number
        },

        numReviews: {
            type: Number
        },

        qty: {
            type: Number
        }
    },

    {
        timestamps: true
    }
)

const Product = mongoose.model('product', productSchema);
module.exports = Product;