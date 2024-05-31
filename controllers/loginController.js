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
    let flag = 1

    const users = await User.findAll({
        attributes: ['id'],
    })
    users.forEach(user => {
        if (user.id === id) {
            flag -= 1
        }
    });

    if (flag) {
        if (password === passwordCheck) {
            const hashedPassword = await bcrypt.hash(password, 10)
            const result = await User.create({
                id: id,
                name: name,
                nickname: nickname,
                grade: grade,
                password: hashedPassword
            })
            res.status(201).json(result)
        } else {
            res.status(400).send("비밀번호가 일치하지 않습니다")
        }
    } else {
        res.status(400).send("해당 학번으로는 이미 계정이 존재합니다")
    }
    
}

/**
 * nicknameCheck
 * @param {*} nickname:string
 */
const nicknameCheck = async(req, res) => {
    const { nickname } = req.body
    const check = await User.findOne({
        attributes: ['nickname'],
        where: { nickname: nickname }
    })
    if (check.nickname === nickname) {
        res.status(400).json({ message: "중복되는 닉네임" })
    } else {
        res.status(201).json({ message: "사용할 수 있는 닉네임" })
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
        attributes: ['id', 'password'],
        where: { id: id }
    })

    const isMatch = await bcrypt.compare(password, check.password);
    if (!isMatch) {
        return res.json({ message: "비밀번호가 일치하지 않습니다." });
    }

    const token = jwt.sign({ id: check.id }, jwtSecret);
    User.update({
        jwt: token
    }, {
        where: { id: id }
    })
    res.cookie("token", token, { httpOnly: true });

    res.status(201).json(token)
}

/**
 * logout
 */
const logoutUser = (req, res) => {
    res.clearCookie("token");
    res.send("로그아웃 완료")
}

module.exports = { createUser, nicknameCheck, loginUser, logoutUser }