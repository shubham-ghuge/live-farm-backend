const express = require('express');
const { authHandler } = require('../middlewares/auth.middleware');
const Video = require('../models/video.model');
const router = express.Router();

router.route('/')
    .get(async (req, res) => {
        try {
            const response = await Video.find({}).lean();
            res.json({ sucess: true, message: "here is the data", response });
        } catch (error) {
            console.log(error);
            res.status(500).json({ sucess: false, message: "something went wrong" });
        }
    })
    .post(authHandler, async (req, res) => {
        const videoData = req.body;
        const { name, url, thumbnail, description } = videoData || {};
        try {
            if (name && url && thumbnail && description) {
                await Video.create(videoData);
                res.status(201).json({ success: true, message: "video added" })
            } else {
                res.json({ success: false, message: "insuffiecient data" });
            }
        } catch (error) {
            console.log(error);
            res._construct(500).json({ success: false, message: "something went wrong" })
        }
    })
module.exports = router;