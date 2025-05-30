const userModel = require("../models/user.model")
const bcryptjs = require("bcryptjs")

// create a User
const createUser = async (req, res) => {
    // get the user's registration details
    const {email, password, ...payload} = req.body;
    // Check if user is valid
    if(!email || !password){
        return res.send("Please provide a valid credentials")
    }
    // check if user exist in database
    const isUser = userModel.findOne({ email })

    if(isUser){
        return res.send("User already exist, please login")
    }

    // create a hashed password
    const salt = bcryptjs.genSaltSync(10)
    const hashedPassword = bcryptjs.hashSync(password, salt)

    try {
        const newUser = new userModel({ email, password:hashedPassword, ...payload})
        const savedUser = await newUser.save()
        return res.json(savedUser)
    } catch (error) {
        console.log(error.message)
        return res.send("Something went wrong")
    }
}

// get all User
const getUser = async (req, res) => {
    const allUsers = await userModel.find()
    return res.json(allUsers)
}

// update a user
const updateUser = async (req,res) => {
    const {id, ...payload} = req.body
    const userUpdate = await userModel.findByIdAndUpdate(id,{...payload}, {new: true})
    return res.json(userUpdate) 
}

// delete User
const deleteUser = async (req, res) => {
    const {id} = req.query
    const userDelete = await userModel.findByIdAndDelete(id)
    return res.json(userDelete)
}

// login a user 
const loginUser = async (req, res) => {
    const {email, password} = req.body

    // get the user from database
    const user = await userModel.findOne({ email })
    if(!user){
        return res.send("This account doesn't exist, sign up!")
    }

    // compare password
    const isValid = bcryptjs.compareSync(password, user.password)

    if(!isValid){
        return res.send("Invalid password!")
    }
}

module.exports = {createUser, getUser, updateUser, deleteUser, loginUser}