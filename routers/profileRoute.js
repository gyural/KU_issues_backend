const express = require('express');
const router = express.Router();
const { getProfile, updateProfile, deleteProfile } = require('../controllers/profileController');

const verifyToken = require('../middleware/token');

router.get('/profile', verifyToken, getProfile);
router.put('/profile/edit', verifyToken, updateProfile);
router.delete('/profile', verifyToken, deleteProfile);

module.exports = router;