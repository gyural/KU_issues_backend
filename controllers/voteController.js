const Vote = require('../models/post/voteModel');

/**
 * 새로운 투표 생성
 * @param {*} req 
 * @param {*} res 
 */
const createVote = async (req, res) => {
  const { post_id, user_id, vote_type } = req.body;

  try {
    // 중복 투표 방지
    const existingVote = await Vote.findOne({ where: { post_id, user_id } });

    if (existingVote) {
      return res.status(400).json({ message: "User has already voted on this post." });
    }

    // 새로운 투표 생성
    const vote = await Vote.create({ post_id, user_id, vote_type });

    // 투표 수 증가
    const upvotes = await Vote.count({ where: { post_id, vote_type: 'upvote' } });
    const downvotes = await Vote.count({ where: { post_id, vote_type: 'downvote' } });

    res.status(201).json({ vote, upvotes, downvotes });
  } catch (error) {
    console.error("Failed to create vote:", error);
    res.status(500).json({ message: "Failed to create vote." });
  }
};

/**
 * 게시물의 투표 수 조회
 * @param {*} req 
 * @param {*} res 
 */
const getVoteCounts = async (req, res) => {
  const { post_id } = req.params;

  try {
    const upvotes = await Vote.count({ where: { post_id, vote_type: 'upvote' } });
    const downvotes = await Vote.count({ where: { post_id, vote_type: 'downvote' } });

    res.status(200).json({ upvotes, downvotes });
  } catch (error) {
    console.error("Failed to fetch vote counts:", error);
    res.status(500).json({ message: "Failed to fetch vote counts." });
  }
};

module.exports = { createVote, getVoteCounts };