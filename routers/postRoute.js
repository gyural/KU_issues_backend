const express= require("express");
const router= express.Router();
const asyncHandler= require("express-async-handler");
const Post = require("../models/post/postModel");
const Like = require("../models/post/likeModel");
const Vote = require("../models/post/voteModel"); // 추가
const { PostModel } = require("../models/index"); 



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
        const{title, body, vote_content}= req.body;
        console.log(title, body, vote_content);
        console.log(req.body.post_id);
        
        // 게시글 생성
        const newPost = await Post.create({ 
            title: title,
            body: body,
            vote_content: vote_content,
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
 * 게시글 상세 조회
 * GET api/posts/{post_id}
 */
router.get("/:post_id", asyncHandler(async (req, res) => {
    const post = await Post.findByPk(req.params.post_id);
    const likesCount = await Like.count({ where: { post_id: req.params.post_id } }); 
    // console.log(likesCount);
    if (post) {
        console.log("if")
        res.render("showPostDetail", { post: post, likesCount}); 
    } else {
        res.status(404).send("Post not found");
    }
}));

/**
 * 좋아요 버튼이 눌렸을 때
 * POST /api/posts/:post_id/like
 */
router.post("/:post_id/like", asyncHandler(async (req, res) => {
    const postId = req.params.post_id;
    const userId = 1; // 실제 로그인된 사용자 ID로 대체할 것

    try {
        const [like, created] = await Like.findOrCreate({
            where: { post_id: postId, user_id: userId },
            defaults: { post_id: postId, user_id: userId }
        });

        if (!created) {
            return res.status(400).send("You have already liked this post.");
        }

        res.redirect(`/api/posts/${postId}`);
    } catch (err) {
        console.error(err);
        res.status(500).send("An error occurred while liking the post.");
    }
}));

module.exports = router;