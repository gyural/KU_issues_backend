const User = require("../models/user/userModel")
const bcrypt = require("bcrypt")

/**
 * register
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

/**
 * login
 * @param {*} nickname:string
 * @param {*} password:string
 */
const loginUser = async(req, res) => {
    const { nickname, password } = req.body
    const check = await User.findOne({
        attributes: ['password'],
        where: { nickname: nickname }
    })

    console.log(check.password)

    const isMatch = await bcrypt.compare(password, check.password);
    if (!isMatch) {
        return res.json({ message: "비밀번호가 일치하지 않습니다." });
    }

    res.json({ message: "로그인 완료!" })
}

module.exports = { createUser, loginUser }