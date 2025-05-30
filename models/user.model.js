// Import the mongoose library
const mongoose = require("mongoose")

// Define the user schema
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        unique: true,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },

    isAdmin: {
        type: Boolean,
        default: false,
    },

    hobbies: {
        type: [String],
    }
}, {timestamps: true})

const userModel = mongoose.model("User", userSchema)
module.exports = userModel