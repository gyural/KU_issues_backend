const express = require('express');
const router = express.Router();
const { getProfile, updateProfile, deleteProfile } = require('../controllers/profileController');

router.route('/profile/:id')
    .get(getProfile)
    .put(updateProfile)
    .delete(deleteProfile);

module.exports = router;