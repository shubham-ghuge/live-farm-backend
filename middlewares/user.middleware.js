const User = require('../models/user.model');

async function isValidRegisterData(req, res, next) {
    const { userDetails } = req.body;
    const { name, email, password } = userDetails || {};
    if (name && email && password) {
        try {
            const checkEmail = await User.findOne({ email });
            if (checkEmail) {
                res.json({ message: "email id already exist" });
            } else {
                next();
            }
        } catch (error) {
            console.log("error in registration middleware", error);
            res.json({ message: "error at backend" })
        }
    } else {
        res.json({ message: "insuffiecient data" });
    }
}
async function isValidLoginData(req, res, next) {
    const data = req.body;
    const { email, password } = data;
    if (email && password) {
        try {
            const checkUser = await User.findOne({ email });
            console.log(checkUser);
            if (!checkUser) {
                res.json({ message: "user doesn't exist" });
            } else {
                req.user = { dbPassword: checkUser.password, userId: checkUser._id, userName: checkUser.name };
                next();
            }
        } catch (error) {
            console.log("error in login middleware", error);
            res.json({ message: "error at backend" })
        }
    } else {
        res.json({ message: "insufficient data" });
    }
}

module.exports = { isValidLoginData, isValidRegisterData }