const mongoose = require("mongoose")

const postSchema = new mongoose.Schema({
    creator: {
        type: mongoose.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    body: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String, // optional image attached to the post
    },
    tags: {
      type: [String], // optional tags or categories
      default: [],
    },
    likes: [
      {
        type: mongoose.Types.ObjectId,
        ref: "User", // users who liked the post
      },
    ],
    comments: [
      {
        user: {
          type: mongoose.Types.ObjectId,
          ref: "User",
        },
        text: String,
        createdAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    status: {
      type: String,
      enum: ["draft", "published"],
      default: "published",
    },
})

const postModel = mongoose.model("Post", postSchema)

module.exports = postModel;