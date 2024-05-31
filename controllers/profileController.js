const asyncHandler = require("express-async-handler");
const User = require('../models/user/userModel');
const bcrypt = require("bcrypt");

// GET /api/profile
const getProfile = asyncHandler(async (req, res) => {
    const id = req.user.id;
    const user = await User.findByPk(id, {
        attributes: { exclude: ['password', 'jwt'] }
    });
    if (!user) {
        res.status(404).send('User not found');
    } else {
        res.status(200).json(user);
    }
});

// PUT /api/profile/edit
const updateProfile = asyncHandler(async (req, res) => {
    const id = req.user.id;
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

// DELETE /api/profile
const deleteProfile = asyncHandler(async (req, res) => {
    const id = req.user.id;
    const user = await User.findByPk(id);
    if (!user) {
        res.status(404).send('User not found');
    } else {
        await user.destroy();
        res.status(200).send('Delete Success');
    }
});

module.exports = { getProfile, updateProfile, deleteProfile };