const User = require("../models/user/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");

require("dotenv").config();
const jwtSecret = process.env.JWT_SECRET;

/**
 * register
 * @param {*} id:num
 * @param {*} name:string
 * @param {*} nickname:string
 * @param {*} grade:num
 * @param {*} password:string
 */
const createUser = async(req, res) => {
    const { id, name, nickname, grade, password, passwordCheck } = req.body
    if (password === passwordCheck) {
        const hashedPassword = await bcrypt.hash(password, 10)
        result = await User.create({
            id: id,
            name: name,
            nickname: nickname,
            grade: grade,
            password: hashedPassword,
        })
        res.status(201).json(result)
    } else {
        res.status(400).json({ message: "비밀번호가 일치하지 않습니다" })
    }
}

/**
 * login
 * @param {*} nickname:string
 * @param {*} password:string
 */
const loginUser = async(req, res) => {
    const { id, password } = req.body
    const check = await User.findOne({
        attributes: ['password'],
        where: { id: id }
    })

    console.log(check.password)

    const isMatch = await bcrypt.compare(password, check.password);
    if (!isMatch) {
        return res.json({ message: "비밀번호가 일치하지 않습니다." });
    }

    const token = jwt.sign({ id: check._id }, jwtSecret);
    res.cookie("token", token, { httpOnly: true });

    res.status(201).json(token)
}

module.exports = { createUser, loginUser }