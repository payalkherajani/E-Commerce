const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const generateToken = require('../utlis/generateToken');
const Cart = require('../models/cart.model');


// @desc    Register User
// @route   POST /api/users/register
// @access  Public

const registerUser = async (req, res) => {
    try {
        let { name, email, password, is_active } = req.body;

        if (!email || !password) {
            return res.status(400).json({ success: false, message: "Email and Password are required parameters" })
        }

        const userExists = await User.findOne({ email })

        if (userExists) {
            return res.status(409).send({ success: false, message: "User exists with this email" })
        }

        password = bcrypt.hashSync(password, 10);

        const newUser = new User({
            name,
            email,
            password,
            is_active
        })

        const registeredUser = await newUser.save();

        const cart = new Cart({
            user: registeredUser._id,
            productsinCart: []
        })

        await cart.save();

        res.status(200).json({ success: true, message: "Registration successfull" })
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Server Error" })
    }
}


// @desc    Login User
// @route   POST /api/users/login
// @access  Public

const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        const userExists = await User.findOne({ email });

        if (!userExists) {
            return res.status(400).json({ success: false, message: "Invalid Credentials" })
        }

        const isPasswordMatch = await bcrypt.compare(password, userExists.password);

        if (!isPasswordMatch) {
            return res.status(400).json({ success: false, message: "Invalid Credentials" })
        }

        const token = generateToken(userExists._id);

        return res.status(200).json({ user: token });

    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Server Error" })

    }
}

// @desc    Get User By ID
// @route   POST /api/users/:id
// @access  Public

const getUserByID = async (req, res) => {
    try {
        const { id } = req.params
        const user = await User.findOne({ _id: id });
        if (!user) {
            return res.status(400).json({ success: false, message: 'No user Found with this ID ' })
        }
        res.status(200).send(user)
    } catch (err) {
        console.log(err);
        res.status(500).json({ success: false, message: "Server Error" })
    }
}

module.exports = { registerUser, loginUser, getUserByID }