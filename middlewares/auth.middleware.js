const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
async function authHandler(req, res, next) {
    const token = req.headers.authorization;
    try {
        const decodedToken = jwt.decode(token, process.env['secret_key']);
        const checkUser = await User.findOne({ _id: decodedToken.userId });
        if (checkUser) {
            req.user = { userId: decodedToken.userId };
            next();
        } else {
            res.status(401).json({ success: false, message: "unauthorized access,user doesn't exist" })
        }
    } catch (error) {
        console.log(error);
        res.status(401).json({ success: false, message: "unauthprized access" });
    }
}

module.exports = { authHandler }