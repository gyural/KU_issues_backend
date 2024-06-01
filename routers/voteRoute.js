const express = require("express");
const router = express.Router();
const { recordVote } = require("../controllers/voteController");
const asyncHandler = require("express-async-handler");

const verifyToken = require('../middleware/token');

/**
 * 투표 응답 기록
 * POST /api/votes/:post_id
 */
router.post("/:post_id",verifyToken, asyncHandler(recordVote));
//router.post("/:post_id", asyncHandler(recordVote));

module.exports = router;
