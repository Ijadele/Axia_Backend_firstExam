const express = require("express")
const authentication = require("../middlewares/auth.middleware")
const {getUser, getOneUser, createUser, updateUser, deleteUser, loginUser} = require("../controllers/user.controller")
const route = express.Router()

route.get('/', getUser)

route.get("/id", authentication, getOneUser)

route.post('/', createUser)

route.put('/', updateUser)

route.delete('/', deleteUser)

route.post('/login', loginUser)

module.exports = route