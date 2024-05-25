const asyncHandler = require("express-async-handler")
const Profile = require("../models/user/userModel");

// GET /api/profile/:id
const getProfile = asyncHandler(async (req, res) => { // findById
    res.status(200).send(`GET Profile : ${req.params.id}`)
});

// PUT /api/profile/:id
const updateProfile = asyncHandler(async (req, res) => { // findByIdAndUpdate
    console.log(req.body)
    res.status(200).send(`PUT Profile : ${req.params.id}`)
});

module.exports = { getProfile, updateProfile };