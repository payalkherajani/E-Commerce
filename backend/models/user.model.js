const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({

    name: {
        type: String,
    },

    email: {
        type: String,
        unique: true,
        required: "Email is required"
    },

    password: {
        type: String,
        required: "Password is required"
    },

    is_active: {
        type: Boolean,
        default: 1
    }

})

module.exports = mongoose.model('user', userSchema);