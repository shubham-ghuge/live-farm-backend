const express = require('express');
const Playlist = require('../models/playlist.model');
const router = express.Router();
const { authHandler } = require('../middlewares/auth.middleware')
const { isPlaylistExist } = require('../middlewares/playlist.middleware')

router.route('/')
    .get(authHandler, async (req, res) => {
        const { userId } = req.user;
        try {
            const response = await Playlist.find({ userId }).populate("videos").exec();
            res.json({ success: true, message: "playlist data", response });
        } catch (error) {
            console.log(error);
            res.json({ success: false, message: "error occured while retrieving playlist data" });
        }
    })
    .post(authHandler, isPlaylistExist, async (req, res) => {
        const { userId } = req.user;
        const { name, videoId } = req.body;
        try {
            await Playlist.create({ name, videos: [videoId], userId })
            res.json({ success: true, message: "playlist created" });
        } catch (error) {
            console.log("error while creating playlist", error);
            res.json({ success: false, message: "error while creating playlist", error });
        }
    })
    .patch(authHandler, async (req, res) => {
        const { userId } = req.user;
        const { name, videoId } = req.body;
        try {
            await Playlist.findOneAndUpdate({ userId, name }, { $push: { videos: videoId } });
            res.json({ success: true, message: `video added in playlist ${name}` })
        } catch (error) {
            console.log("error while updating playlist", error);
            res.json({ success: false, message: "error while updating playlist" })
        }
    })
    .delete(authHandler, async (req, res) => {
        const { userId } = req.user;
        const { name, videoId } = req.body;
        try {
            await Playlist.findOneAndUpdate({ userId, name }, { $pull: { videos: videoId } });
            res.json({ success: true, message: `video removed from ${name} playlist` });
        } catch (error) {
            console.log("error in deleting playlist", error);
            res.json({ success: false, message: "error in deleting" })
        }
    })

module.exports = router;