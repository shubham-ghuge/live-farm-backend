const mongoose = require('mongoose');
const { Schema } = mongoose;

const playlistSchema = new Schema({
    name: { type: String, required: "playlist name is required" },
    videos: [{
        type: Schema.Types.ObjectId,
        ref: 'Video'
    }],
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
})
const Playlist = mongoose.model('Playlist', playlistSchema);

module.exports = Playlist;