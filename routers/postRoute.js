const express= require("express");
const router= express.Router();
const asyncHandler= require("express-async-handler");
const Post = require("../models/post/postModel");
const { PostModel } = require("../models/index"); // 수정

/**
 * 모든 게시판 내용 가져오기
 * GET /api/posts
 */
router.get("/", asyncHandler(async(req, res)=>{
    const data= await Post.findAll(); // DB에서 모든 데이터를 다 가져옴
    res.render("showPost", {data}); 
}));

/**
 * 게시판 작성(작성 페이지로 접근하기 위한)
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
        
        const newPost = await Post.create({ 
            title: title,
            body: body,
            user_id: 1  // 임시로 설정(로그인 된 id를 받아와 자동으로 넣도록 후에 수정할 것)
        });
        console.log("데이터베이스에 값 삽입 완료");

        res.redirect("/api/posts/");
    }catch(error){
        console.log("게시물 생성 중 에러 발생", error);
        res.status(500).send("게시물 생성 중 에러가 발생");
    }
}));

/**
 * 게시글 내용 확인
 * GET api/posts/{post_id}
 */
router.get("/:post_id", asyncHandler(async (req, res) => {
    const post = await Post.findByPk(req.params.post_id);
    if (post) {
        res.render("showPostDetail", { post: post });
    } else {
        res.status(404).send("Post not found");
    }
}));





module.exports = router;