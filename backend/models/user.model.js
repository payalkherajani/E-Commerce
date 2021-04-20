const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({

    name: {
        type: String,
    },

    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"]
    },

    password: {
        type: String,
        required: "Password is required"
    },

    is_active: {
        type: Boolean,
        default: 1
    }

},

    {
        timestamps: true
    }
)

const User = mongoose.model('user', userSchema);

module.exports = User;