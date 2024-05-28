const asyncHandler = require("express-async-handler");
const User = require('../models/user/userModel');
const bcrypt = require("bcrypt");
//require("dotenv").config();
//const jwtSecret = process.env.JWT_SECRET
//const jwt = require("jsonwebtoken")

// GET /api/profile/:id
const getProfile = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const user = await User.findByPk(id);
    if (!user) {
        res.status(404).send('User not found');
    } else {
        res.status(200).json(user);
    }
});

// PUT /api/profile/:id
// Can Edit : grade, name, nickname, password
const updateProfile = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const { grade, name, nickname, password } = req.body;
    const user = await User.findByPk(id);
    if (!user) {
        res.status(404).send('User not found');
    } else {
        user.grade = grade;
        user.name = name;
        user.nickname = nickname;
        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }
        await user.save();
        res.status(200).send('Edit Success');
    }
});

// DELETE /api/profile/:id
const deleteProfile = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const user = await User.findByPk(id);
    if (!user) {
        res.status(404).send('User not found');
    } else {
        await user.destroy();
        res.status(200).send('Delete Success');
    }
});

module.exports = { getProfile, updateProfile, deleteProfile };