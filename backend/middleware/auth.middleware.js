const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const auth = async (req, res, next) => {


    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' })
    }

    try {

        const decoded = await jwt.verify(token, process.env.JWT_SECRET);


        req.user = decoded.id;
        const id = req.user;

        const verifiedUser = await User.findOne({ _id: id });

        if (verifiedUser && verifiedUser.is_active) {
            next();
        }
        else {
            return res.status(401).json({ message: 'Bad token, authorization denied' })
        }
    }
    catch (err) {
        res.status(500).status({ success: false, message: 'Server Error' })
    }
}
module.exports = auth;