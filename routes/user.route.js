const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const salt = bcrypt.genSaltSync(8);
const { isValidLoginData, isValidRegisterData } = require('../middlewares/user.middleware');
const User = require('../models/user.model');

router.route('/register')
    .post(isValidRegisterData, async (req, res) => {
        const userDetails = req.body;
        const { name, email, password } = userDetails;
        try {
            const hashedPassword = bcrypt.hashSync(password, salt);
            const response = await User.create({ name, email, password: hashedPassword });
            const token = jwt.sign({ userId: response._id }, process.env['secret_key'], { expiresIn: '24h' });
            res.status(201).json({ success: true, message: "registration successful", token });
        } catch (error) {
            console.log("error in registration", error);
            res.json({ success: false, message: "couldn't register you,please try again!" })
        }
    })

router.route('/login')
    .post(isValidLoginData, async (req, res) => {
        const { dbPassword, userId, userName } = req.user;
        const { password } = req.body;
        try {
            const isValidUser = bcrypt.compareSync(password, dbPassword);
            if (isValidUser) {
                const token = jwt.sign({ userId }, process.env['secret_key'], { expiresIn: '24h' });
                res.status(200).json({ success: true, message: "user loggin successful", token, userName });
            } else {
                res.json({ success: false, message: "That didn't worked, please try again!" })
            }
        } catch (error) {
            console.log("error in login", error);
            res.json({ success: false, message: "error while logging in" })
        }
    })

module.exports = router;