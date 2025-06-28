const express = require("express");
const authentication = require("../middlewares/auth.middleware");
const {createPost, deletePost, updatePost, getUsersPosts, getSinglePost} = require("../controllers/post.controller")

const route = express.Router()

route.post("/post", authentication, createPost)

route.delete("/post", authentication, deletePost)

route.put("/post", authentication, updatePost)

route.get("/get-all-post", getUsersPosts)

route.get("/single-post", getSinglePost)

module.exports = route;