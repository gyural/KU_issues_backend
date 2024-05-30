const express = require('express');
const router = express.Router();
const { getProfile, updateProfile, deleteProfile } = require('../controllers/profileController');

const verifyToken = require('../middleware/token');

router.get('/profile/:id', verifyToken, getProfile);
router.put('/profile/:id/edit', verifyToken, updateProfile, verifyToken);
router.delete('/profile/:id', verifyToken, deleteProfile);

module.exports = router;