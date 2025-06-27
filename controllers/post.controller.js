const postModel = require("../models/post.model");
const userModel = require("../models/user.model");

const createPost = async (req, res) => {
    const body = req.body;
    const { id } = req.user;
    
    try {
        const newPost = new postModel({creator: id, ...body})
        const savedPost = await newPost.save()
        // modify the user account
        const userInfo = await userModel.findById(id)
        const allPostIds = userInfo.posts
        allPostIds.push(savedPost._id) 
        await userModel.findByIdAndUpdate(id, {posts: allPostIds}, {new: true})
        return res.send("post created successfully!!!")
    } catch (error) {
        console.log(error.message)
        return res.send(error.message)
    }
}

const deletePost = async (req, res) => {
    const {postId} = req.query;
    const { id, admin } = req.user;
    // check for post existence
    const post = await postModel.findById(postId);

    if (!post) {
        return res.send("Post does not exist")
    } 
    // check if is the creator
    if (id != post.creator && !admin) { //!post.creator.equals(userId)
        return res.send("This post does not belong to you")
    }

    try {
        await postModel.findByIdAndDelete(postId)
        return res.send("post deleted successfully")
    } catch (error) {
        return res.send(error.message)
    }
}

const updatePost = async (req, res) => {
    const {postId, userId} = req.query
    const body = req.body
    // get the post
    const post = postModel.findById(postId)
    if (!post) {
        return res.send("post does not exist")
    }
    // check if is the owner
    if (userId != post.creator) {
        return res.send("You can only update your post")
    }

    try {
        await postModel.findByIdAndUpdate(postId, {...body}, {new:true})
        res.send("Post updated successfully")
    } catch (error) {
        res.send("Something went wrong")
    }
}

// get all the post
const getUsersPosts = async (req, res) => {
    const {userId} = req.query;

    try {
        const posts = await postModel.find({ creator: userId })
        return res.json(posts)
    } catch (error) {
        return res.send(error.message)
    }
}

// get single post
const getSinglePost = async (req, res) => {
    const {postId} = req.query;
    try {
        const post = await postModel.findById(postId).populate("creator");
        return res.json(post)
    } catch (error) {
        return res.send(error.message)
    }
}

module.exports = {createPost, deletePost, updatePost, getUsersPosts, getSinglePost}