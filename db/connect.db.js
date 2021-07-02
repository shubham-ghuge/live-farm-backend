const mongoose = require('mongoose');

async function initializeDbConnection() {
    try {
        await mongoose.connect(process.env['mongodb_uri'], { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false });
        console.log('DB connected');
    } catch (error) {
        console.log('Error In Connecting to DB', error);
    }
}
module.exports = initializeDbConnection;