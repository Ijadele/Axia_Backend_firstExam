const express = require("express")
const {getUser, createUser, updateUser, deleteUser, loginUser} = require("../controllers/user.controller")
const route = express.Router()

route.get('/', getUser)

route.post('/', createUser)

route.put('/', updateUser)

route.delete('/', deleteUser)

route.post('/login', loginUser)

module.exports = route