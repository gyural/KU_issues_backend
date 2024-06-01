const Vote = require("../models/post/voteModel");

/**
 * 투표 응답 기록
 * @param {*} req
 * @param {*} res
 */
const recordVote = async (req, res) => {
    const { post_id } = req.params;
    const user_id = req.user.id;
    const { vote_type } = req.body;
    //const { user_id, vote_type } = req.body;
    // const { post_id } = req.params;
    // const { user_id, vote_type } = req.body;

    try {
        // 새로운 투표 생성
        const vote = await Vote.create({ post_id, user_id, vote_type });

        res.status(201).json(vote);
    } catch (error) {
        console.error("Failed to record vote:", error);
        res.status(500).json({ message: "Failed to record vote." });
    }
};

module.exports = { recordVote };
