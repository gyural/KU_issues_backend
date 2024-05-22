const User = require("../models/user/userModel")
const bcrypt = require("bcrypt")

/**
 * 
 * @param {*} id:num
 * @param {*} name:string
 * @param {*} nickname:string
 * @param {*} grade:num
 * @param {*} password:string
 */
const createUser = async(req, res) => {
    const { id, name, nickname, grade, password } = req.body
    const hashedPassword = await bcrypt.hash(password, 10)
    console.log(id, name, nickname, grade, hashedPassword)
    const result = await User.create({
        id: id,
        name: name,
        nickname: nickname,
        grade: grade,
        password: hashedPassword,
    })

    res.status(201).json(result)
}

module.exports = { createUser }