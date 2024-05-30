const express = require("express")
const route = express.Router()
const { createUser, nicknameCheck, loginUser } = require("../controllers/loginController")

route.post('/register', createUser)
route.post('/nicknameCheck', nicknameCheck)
route.post("/login", loginUser)

module.exports = route