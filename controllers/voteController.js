const VoteModel = require('../models/voteModel');
const VoteResponseModel = require('../models/voteResponseModel');
const asyncHandler = require('express-async-handler');

// 투표 수 조회
const getVoteCounts = asyncHandler(async (req, res) => {
    const { postID } = req.params;

    try {
        const vote = await VoteModel.findOne({ where: { postID } });

        if (!vote) {
            return res.status(404).json({ message: '투표 정보를 찾을 수 없습니다.' });
        }

        res.status(200).json({ prosCnt: vote.prosCnt, consCnt: vote.consCnt });
    } catch (error) {
        res.status(500).json({ message: '투표 수 조회 중 오류가 발생했습니다.', error });
    }
});

// 찬성 투표
const votePro = asyncHandler(async (req, res) => {
    const { postID } = req.params;
    const userID = req.user.userId;

    try {
        const voteResponse = await VoteResponseModel.findOne({ where: { voteID: postID, userID } });

        if (voteResponse) {
            return res.status(403).json({ message: '이미 투표하셨습니다.' });
        }

        await VoteModel.increment('prosCnt', { where: { postID } });
        await VoteResponseModel.create({ voteID: postID, userID });

        res.status(200).json({ message: '찬성 투표가 반영되었습니다.' });
    } catch (error) {
        res.status(500).json({ message: '찬성 투표 중 오류가 발생했습니다.', error });
    }
});

// 반대 투표
const voteCon = asyncHandler(async (req, res) => {
    const { postID } = req.params;
    const userID = req.user.userId;

    try {
        const voteResponse = await VoteResponseModel.findOne({ where: { voteID: postID, userID } });

        if (voteResponse) {
            return res.status(403).json({ message: '이미 투표하셨습니다.' });
        }

        await VoteModel.increment('consCnt', { where: { postID } });
        await VoteResponseModel.create({ voteID: postID, userID });

        res.status(200).json({ message: '반대 투표가 반영되었습니다.' });
    } catch (error) {
        res.status(500).json({ message: '반대 투표 중 오류가 발생했습니다.', error });
    }
});

module.exports = { getVoteCounts, votePro, voteCon };
