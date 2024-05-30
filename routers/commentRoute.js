const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { getCommentsByPost, createComment, deleteComment } = require("../controllers/commentController");

// 특정 게시글의 모든 댓글 조회
router.get("/:post_id", asyncHandler(getCommentsByPost));

// 댓글 생성
router.post("/:post_id/create", asyncHandler(createComment));

// 댓글 삭제
router.delete("/:comment_id", asyncHandler(deleteComment));

module.exports = router;