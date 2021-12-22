const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({

    name: {
        type: String,
        default: 'user'
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
        default: true
    }

},

    {
        timestamps: true
    }
)

const User = mongoose.model('user', userSchema);

module.exports = User;