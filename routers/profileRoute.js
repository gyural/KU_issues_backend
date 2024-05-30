const express = require('express');
const router = express.Router();
const { getProfile, updateProfile, deleteProfile } = require('../controllers/profileController');

router.get('/profile/:id', getProfile);
router.put('/profile/:id/edit', updateProfile);
router.delete('/profile/:id', deleteProfile);

module.exports = router;