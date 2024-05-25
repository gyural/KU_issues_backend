const express = require('express');
const router = express.Router();
const { getProfile, updateProfile } = require('../controllers/profileController');

router.route('/profile/:id')
    .get(getProfile)
    .put(updateProfile);

// // GET Profile
// app.get('/profile/:id', (req, res) => {
//     res.send(`GET Profile : ${req.params.id}`)
//     //res.json()
// })

// // PUT Profile
// app.put('/profile/:id', (req, res) => {
//     res.send(`PUT Profile : ${req.params.id}`)
// })

module.exports = router;