const express = require("express")
const route = express.Router()
const { createUser, nicknameCheck, loginUser, logoutUser } = require("../controllers/loginController")

route.post("/register", createUser)
route.post("/nicknameCheck", nicknameCheck)
route.post("/login", loginUser)
route.get("/logout", logoutUser)

module.exports = route