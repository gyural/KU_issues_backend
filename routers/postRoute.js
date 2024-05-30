const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const {
  getAllPosts,
  renderCreatePost,
  createPost,
  getPostDetail,
  addComment,
  likePost
} = require("../controllers/postController");

// 모든 게시판 내용 가져오기
router.get("/", asyncHandler(getAllPosts));

// 게시판 작성(작성 페이지로 접근하기 위한)
router.get("/create", asyncHandler(renderCreatePost));

// 게시판 작성 내용을 DB에 넣기
router.post("/create", asyncHandler(createPost));

// 게시글 상세 조회
router.get("/:post_id", asyncHandler(getPostDetail));

// 댓글 추가
router.post("/:post_id/comment", asyncHandler(addComment));

// 좋아요 버튼이 눌렸을 때
router.post("/:post_id/like", asyncHandler(likePost));

module.exports = router;
