const express = require('express');
const router = express.Router();
const { getProfile,
    updateProfile,
    deleteProfile,
    authenticateToken } = require('../controllers/profileController');

// GET /api/profile/:id
router.get('/profile/:id', authenticateToken, getProfile);

// PUT /api/profile/:id/edit
router.put('/profile/:id/edit', authenticateToken, updateProfile);

// DELETE /api/profile/:id
router.delete('/profile/:id', authenticateToken, deleteProfile);

module.exports = router;

/*, authenticateToken*/