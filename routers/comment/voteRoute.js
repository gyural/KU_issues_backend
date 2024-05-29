const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const Vote = require("../models/vote/voteModel");
const Post = require("../models/post/postModel");

/**
 * 투표의 현재 상태(찬성 수, 반대 수) 조회
 * GET /api/votes/:post_id
 */
router.get("/:post_id", asyncHandler(async (req, res) => {
    try {
        const postId = req.params.post_id;

        const upvotes = await Vote.count({ where: { post_id: postId, vote_type: "upvote" } });
        const downvotes = await Vote.count({ where: { post_id: postId, vote_type: "downvote" } });

        res.status(200).json({ upvotes, downvotes });
    } catch (error) {
        console.error("Failed to fetch vote counts:", error);
        res.status(500).json({ message: "Failed to fetch vote counts." });
    }
}));

/**
 * 투표 생성
 * POST /api/votes/:post_id
 */
router.post("/:post_id", asyncHandler(async (req, res) => {
    try {
        const { user_id, vote_type } = req.body;
        const postId = req.params.post_id;

        // 중복 투표 방지
        const existingVote = await Vote.findOne({ where: { post_id: postId, user_id: user_id } });

        if (existingVote) {
            return res.status(400).json({ message: "User has already voted on this post." });
        }

        // 새로운 투표 생성
        const vote = await Vote.create({ post_id: postId, user_id: user_id, vote_type: vote_type });

        // 투표 수 증가
        const voteCounts = await Vote.findAll({
            attributes: [
                [Sequelize.fn("COUNT", Sequelize.col("vote_type")), "count"],
                "vote_type"
            ],
            where: { post_id: postId },
            group: ["vote_type"]
        });

        const counts = voteCounts.reduce((acc, item) => {
            acc[item.vote_type] = item.get("count");
            return acc;
        }, { upvote: 0, downvote: 0 });

        res.status(201).json({ vote, counts });
    } catch (error) {
        console.error("Failed to create vote:", error);
        res.status(500).json({ message: "Failed to create vote." });
    }
}));

module.exports = router;