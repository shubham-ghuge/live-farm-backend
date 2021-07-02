const express = require('express');
const cors = require('cors');
require('dotenv').config();
const dbConnection = require('./db/connect.db');
const app = express();
const PORT = 3000

app.use(express.json());
app.use(cors());
dbConnection();

app.get('/', (req, res) => {
    res.json({ "hello hello helloo": "from Livefarm API" })
})

app.listen(process.env.port || PORT, () => {
    console.log("server started at port " + PORT)
})