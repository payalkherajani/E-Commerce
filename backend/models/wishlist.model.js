const mongoose = require('mongoose');
const { Schema } = mongoose;

const wishlistSchema = new Schema(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'user'
        },

        productsinWishlist: [
            {
                productId: {
                    type: Schema.Types.ObjectId,
                    ref: 'product'
                },
            }
        ]
    },

    {
        timestamps: true
    }

)

const Wishlist = mongoose.model('wishlist', wishlistSchema);
module.exports = Wishlist;