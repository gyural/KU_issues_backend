const express= require("express");
const router= express.Router();
const asyncHandler= require("express-async-handler");
const Post = require("../models/post/postModel");
const Like = require("../models/post/likeModel");
const Vote = require("../models/post/voteModel"); 
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

// 게시글 상세 조회를 시작할 때 vote_content의 내용도 함께 보낸다.(vote_content는 null일 수 있음)
// 아래의 내용은 vote_content가 null이 아닐 경우에만 실행
// // votes DB에 접속하여 해당 post_id에 대한 vote_type을 모두 받아온다.
// // vote_type에서 'upvote', 'downvote'를 구분하여 저장한 후 두 값을 넘긴다.
/**
 * 게시글 상세 조회
 * GET api/posts/{post_id}
 */
router.get("/:post_id", asyncHandler(async (req, res) => {
    const post = await Post.findByPk(req.params.post_id);
    const likesCount = await Like.count({ where: { post_id: req.params.post_id } }); 

    if (post) {
        let upvotes = 0;
        let downvotes = 0;
        console.log(upvotes, downvotes);

        // 현재 if 문에서 오류 발생----------------------------------------------------------------
        // vote_content가 null이 아닌 경우 votes 테이블에서 vote_type을 가져와서 계산
        if (post.vote_content) {
            console.log(req.params.post_id);
            upvotes = await Vote.count({ where: { post_id: req.params.post_id, vote_type: "upvote" } });
            downvotes = await Vote.count({ where: { post_id: req.params.post_id, vote_type: "downvote" } });

            
            // const votes = await Vote.findAll({ where: { post_id: req.params.post_id } }); // 해당 부분에서 문제 발생 
            console.log(upvotes, downvotes);
            // upvotes = votes.filter(vote => vote.vote_type === 'upvote').length;
            // downvotes = votes.filter(vote => vote.vote_type === 'downvote').length;
        }
        // console.log(post, likesCount, upvotes, downvotes);
        // 게시글과 관련된 정보를 클라이언트에 전달
        res.render("showPostDetail", { post, likesCount, upvotes, downvotes }); 
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