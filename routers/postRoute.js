const express= require("express");
const router= express.Router();
const asyncHandler= require("express-async-handler");
const Post = require("../models/post/postModel");

/**
 * 게시판 작성
 * GET /api/posts/create
 */
router.get("/create", asyncHandler(async(req, res)=>{
    res.render("addPost");
}))

/**
 * 게시판 작성 내용을 DB에 넣기
 * POST /api/posts/create
 */
router.post("/create", asyncHandler(async(req, res)=>{
    try{
        const{title, body}= req.body;
        console.log(title, body);

        const newPost= await Post.create({
            title: title,
            body: body,
            user_id: 1111  // 임시로 설정(로그인 된 id를 받아와 자동으로 넣도록 후에 수정할 것)
        });

        res.redirect("showPost");
    }catch(error){
        console.log("게시물 생성 중 에러 발생", error);
        res.status(500).send("게시물 생성 중 에러가 발생");
    }
}));

module.exports = router;