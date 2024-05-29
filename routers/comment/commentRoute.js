const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const Comment = require("../models/comment/commentModel");
const Post = require("../models/post/postModel");
const User = require("../models/user/userModel");

// 댓글 불러오기
router.get("/:post_id", asyncHandler(async (req, res) => {
    const postId = req.params.post_id;
    try {
        const comments = await Comment.findAll({
            where: { postId },
            include: [
                {
                    model: User,
                    attributes: ['name', 'nickname']
                }
            ],
            order: [['createdAt', 'DESC']]
        });

        if (comments.length > 0) {
            res.render("showComments", { comments });
        } else {
            res.status(404).send("댓글이 없습니다.");
        }
    } catch (error) {
        console.error("댓글 불러오기 중 에러 발생", error);
        res.status(500).send("댓글 불러오기 중 에러가 발생했습니다.");
    }
}));

// 댓글 생성
router.post("/:post_id/create", asyncHandler(async (req, res) => {
    const { content } = req.body;
    const postId = req.params.post_id;
    const userId = 1; // 토큰으로 받아오기?

    if (!content || content.length > 50) {
        return res.status(400).send("댓글 내용은 필수이며 최대 50자까지 작성 가능합니다.");
    }

    try {
        const newComment = await Comment.create({
            postId,
            userId,
            content
        });

        console.log("댓글이 데이터베이스에 저장되었습니다.");
        res.redirect(`/api/posts/${postId}`);
    } catch (error) {
        console.error("댓글 생성 중 에러 발생", error);
        res.status(500).send("댓글 생성 중 에러가 발생했습니다.");
    }
}));

// 댓글 삭제
router.delete("/:comment_id", asyncHandler(async (req, res) => {
    const commentId = req.params.comment_id;
    try {
        const comment = await Comment.findByPk(commentId);

        if (!comment) {
            return res.status(404).send("댓글을 찾을 수 없습니다.");
        }

        await comment.destroy();
        res.status(200).send("댓글이 삭제되었습니다.");
    } catch (error) {
        console.error("댓글 삭제 중 에러 발생", error);
        res.status(500).send("댓글 삭제 중 에러가 발생했습니다.");
    }
}));

module.exports = router;