const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const VoteModel = require("../models/comment/voteModel");
const VoteResponseModel = require("../models/comment/voteresponseModel");
const Post = require("../models/post/postModel");

router.post("/create", asyncHandler(async (req, res) => {
    try {
        const { postID } = req.body;

        const newVote = await VoteModel.create({
            postID: postID,
            prosCnt: 0,
            consCnt: 0
        });

        console.log("새로운 투표가 생성되었습니다.");
        res.status(201).json(newVote);
    } catch (error) {
        console.log("투표 생성 중 에러 발생", error);
        res.status(500).send("투표 생성 중 에러가 발생했습니다.");
    }
}));

router.get("/:voteID", asyncHandler(async (req, res) => {
    try {
        const vote = await VoteModel.findByPk(req.params.voteID);

        if (vote) {
            res.json({
                prosCnt: vote.prosCnt,
                consCnt: vote.consCnt
            });
        } else {
            res.status(404).send("Vote not found");
        }
    } catch (error) {
        console.log("투표 조회 중 에러 발생", error);
        res.status(500).send("투표 조회 중 에러가 발생했습니다.");
    }
}));


router.post("/:voteID/respond", asyncHandler(async (req, res) => {
    try {
        const { userID, response } = req.body; // response는 "pros" 또는 "cons" 중 하나
        const voteID = req.params.voteID;

        // 응답 확인
        const existingResponse = await VoteResponseModel.findOne({
            where: { voteID: voteID, userID: userID }
        });

        if (existingResponse) {
            return res.status(400).send("You have already responded to this vote.");
        }

        // 새로운 응답 저장
        await VoteResponseModel.create({
            voteID: voteID,
            userID: userID
        });

        // 찬성 또는 반대 수 증가
        const vote = await VoteModel.findByPk(voteID);
        if (response === "pros") {
            vote.prosCnt += 1;
        } else if (response === "cons") {
            vote.consCnt += 1;
        } else {
            return res.status(400).send("Invalid response value. Must be 'pros' or 'cons'.");
        }

        await vote.save();

        res.status(200).send("Vote response recorded successfully.");
    } catch (error) {
        console.log("투표 응답 중 에러 발생", error);
        res.status(500).send("투표 응답 중 에러가 발생했습니다.");
    }
}));

module.exports = router;
