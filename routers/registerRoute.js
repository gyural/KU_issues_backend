const express = require("express")
const route = express.Router()
const { createUser } = require("../controllers/registerController")

route.post('/register', createUser)

module.exports = route