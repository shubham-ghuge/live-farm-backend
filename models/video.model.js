const mongoose = require('mongoose');
const { Schema } = mongoose;

const videoSchema = new Schema({
    name: { type: String, required: "video name is required" },
    url: { type: String, required: "video url is required" },
    thumbnail: { type: String, required: "video thumbnail is required" },
    description: { type: String, required: "video description is required" }
})

const Video = mongoose.model('Video', videoSchema);
module.exports = Video;