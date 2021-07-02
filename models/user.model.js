const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    name: String,
    email: { type: String, required: "Email is required", lowerCase: true },
    password: { type: String, required: "Password is required" }
})
const User = mongoose.model('User',userSchema);
module.exports = User;