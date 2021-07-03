const Playlist = require("../models/playlist.model");

function isPlaylistExist(req, res, next) {
    const { userId } = req.user;
    const { name } = req.body;
    try {
        const checkPlaylist = Playlist.findOne({ userId, name }).lean();
        if (!checkPlaylist) {
            next();
        } else {
            res.json({ success: false, message: "playlist already exists" });
        }
    } catch (error) {
        console.log("error in playlist middleware", error);
        res.json({ success: true, message: "error while creating playlist" });
    }
}

module.exports = { isPlaylistExist }