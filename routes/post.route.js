const express = require("express");
const authentication = require("../middlewares/auth.middleware");
const {createPost} = require("../controllers/post.controller")

const route = express.Router()

route.post("/post", authentication, createPost)

module.exports = route;