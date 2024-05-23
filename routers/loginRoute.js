const express = require("express")
const route = express.Router()
const { createUser, loginUser } = require("../controllers/loginController")

route.post('/register', createUser)
route.post("/login", loginUser)

module.exports = route