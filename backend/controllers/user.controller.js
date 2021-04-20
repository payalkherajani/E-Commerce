const User = require('../models/user.model');

// @desc    Register User
// @route   POST /api/users/register
// @access  Public

const registerUser = async (req, res) => {
    try {
        const { name, email, password, is_active } = req.body;

        if (!name || !email || !password || is_active) {
            return res.status(400).json({ success: false, message: "Name, Email, Password and active are required parameters" })
        }

        const userExists = await User.findOne({ email })

        if (userExists) {
            return res.status(409).send({ success: false, message: "User exists with this email" })
        }

        const newUser = new User({
            name,
            email,
            password,
            is_active
        })

        await newUser.save();

        res.status(200).json({ success: true, message: "Registration successfull" })
    } catch (err) {
        res.status(500).json({ success: false, message: "Server Error" })
    }
}

module.exports = { registerUser }