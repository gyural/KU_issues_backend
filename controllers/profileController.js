const asyncHandler = require("express-async-handler")
const User = require('../models/user/userModel');

// GET /api/profile/:id
const getProfile = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const user = await User.findByPk(id);
    if (!user) {
        res.status(404).send('404 User not found');
    } else {
        res.json(user);
    }
});

// PUT /api/profile/:id
const updateProfile = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const { name, nickname, grade } = req.body;
    const user = await User.findByPk(id);
    if (!user) {
        res.status(404).send('User not found');
    } else {
        user.name = name;
        user.nickname = nickname;
        user.grade = grade;
        await user.save();
        res.send('User updated successfully');
    }
});

module.exports = { getProfile, updateProfile };