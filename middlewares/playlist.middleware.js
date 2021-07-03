const Playlist = require("../models/playlist.model");

async function isPlaylistExist(req, res, next) {
    const { userId } = req.user;
    const { name } = req.body;
    if (name) {
        try {
            const checkPlaylist = await Playlist.findOne({ userId, name }).lean();
            if (!checkPlaylist) {
                next();
            } else {
                res.json({ success: false, message: "playlist already exists" });
            }
        } catch (error) {
            console.log("error in playlist middleware", error);
            res.json({ success: true, message: "error while creating playlist" });
        }
    } else {
        res.json({ success: false, message: "insuffiecient data" })
    }
}

async function checkPlaylistById(req, res, next, id) {
    try {
        await Playlist.findById(id);
        next();
    } catch (error) {
        console.log("error in playlist middleware", error)
        res.json({ success: false, message: "playlist doesnt exist" })
    }
}

module.exports = { isPlaylistExist, checkPlaylistById }