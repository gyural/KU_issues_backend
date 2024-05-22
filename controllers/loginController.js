const User = require("../models/userModel")

/**
 * 
 * @param {*} nickname:string
 * @param {*} password:string
 */
const loginUser = async(req, res) => {
    const { nickname, password } = req.body
    const check = await User.findOne({
        attributes: ['nickname', 'password'],
        where: {
            
        }
    })
}