const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema(
    {
        category_name: {
            type: String,
            required: "Category Name is required"
        },

    },
    {
        timestamps: true
    }
)

const Category = mongoose.model('category', categorySchema);

module.exports = Category;