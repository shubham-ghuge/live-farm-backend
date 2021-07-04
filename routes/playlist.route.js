const express = require('express');
const Playlist = require('../models/playlist.model');
const router = express.Router();
const { authHandler } = require('../middlewares/auth.middleware')
const { isPlaylistExist, checkPlaylistById } = require('../middlewares/playlist.middleware')

router.route('/')
    .get(authHandler, async (req, res) => {
        const { userId } = req.user;
        try {
            const response = await Playlist.find({ userId });
            res.json({ success: true, message: "playlist data", response });
        } catch (error) {
            console.log(error);
            res.json({ success: false, message: "error occured while retrieving playlist data" });
        }
    })/* will return all the playlist data of user */
    .post(authHandler, isPlaylistExist, async (req, res) => {
        const { userId } = req.user;
        const { name, videoId } = req.body;
        try {
            const response = await Playlist.create({ name, videos: [videoId], userId })
            res.json({ success: true, message: "playlist created", id: response._id });
        } catch (error) {
            console.log("error while creating playlist", error);
            res.json({ success: false, message: "error while creating playlist", error });
        }
    })/* will create playlist for user */


router.param("playlistId", checkPlaylistById)
router.route('/:playlistId')
    .get(authHandler, async (req, res) => {
        const { userId } = req.user;
        const { playlistId } = req.params;
        try {
            const response = await Playlist.findOne({ userId, _id: playlistId }).populate("videos").exec();
            res.json({ success: true, response });
        } catch (error) {
            console.log("error in retrieving playlist data", error)
            res.json({ success: false, message: "something went wrong" });
        }
    })/* will return particular playlist data */
    .delete(authHandler, async (req, res) => {
        const { playlistId } = req.params;
        try {
            await Playlist.findByIdAndDelete(playlistId);
            res.json({ success: true, message: "playlist deleted" });
        } catch (error) {
            console.log(error);
            res.json({ success: false, message: "something went wrong" });
        }
    })/* will delete particular playlist */

router.route('/:playlistId/:videoId')
    .patch(authHandler, async (req, res) => {
        const { playlistId, videoId } = req.params;
        try {
            await Playlist.findByIdAndUpdate(playlistId, { $push: { videos: videoId } });
            res.json({ success: true, message: `video added in playlist` })
        } catch (error) {
            console.log("error while updating playlist", error);
            res.json({ success: false, message: "error while updating playlist" })
        }
    })/* will add videos in playlist */
    .delete(authHandler, async (req, res) => {
        const { playlistId, videoId } = req.params;
        try {
            await Playlist.findByIdAndUpdate(playlistId, { $pull: { videos: videoId } });
            res.json({ success: true, message: `video removed from playlist` });
        } catch (error) {
            console.log("error in deleting playlist", error);
            res.json({ success: false, message: "error in deleting" })
        }
    })/* will delete video from playlist */

module.exports = router;
