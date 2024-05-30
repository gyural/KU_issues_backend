const express = require("express");
const router = express.Router();
const { createVote, getVoteCounts } = require("../controllers/voteController");
const asyncHandler = require("express-async-handler");

/**
 * 특정 게시물의 투표 수 조회
 * GET /api/votes/:post_id
 */
router.get("/:post_id", asyncHandler(getVoteCounts));

/**
 * 투표 생성
 * POST /api/votes/:post_id
 */
router.post("/:post_id", asyncHandler(createVote));

module.exports = router;