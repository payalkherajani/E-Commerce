const User = require('../models/user.model');

// @desc    Register User
// @route   POST /api/users/register
// @access  Public

const registerUser = async (req, res) => {
    try {
        const { name, email, password, is_active } = req.body;
        res.status(200).send(name)
    } catch (err) {
        console.log(err);
    }
}

module.exports = { registerUser }