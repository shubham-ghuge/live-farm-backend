const express = require('express');
const cors = require('cors');
require('dotenv').config();
const dbConnection = require('./db/connect.db');
const app = express();
const PORT = 3000;
const videoRouter = require('./routes/video.route');
const playlistRouter = require('./routes/playlist.route');
const userRouter = require('./routes/user.route');

app.use(express.json());
app.use(cors());
dbConnection();
app.use('/videos', videoRouter);
app.use('/playlists', playlistRouter);
app.use('/users', userRouter);

app.get('/', (req, res) => {
    res.status(200).json({ "hello hello helloo": "from Livefarm API" })
})

app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).json({ message: 'something went wrong' })
})

app.use('/*', (req, res) => {
    res.status(404).json({ message: "invalid route" })
})

app.listen(process.env.PORT || PORT, () => {
    console.log("server started at port " + PORT)
})