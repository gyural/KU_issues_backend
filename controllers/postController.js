const Post = require("../models/post/postModel");
const Like = require("../models/post/likeModel");
const Vote = require("../models/post/voteModel");
const User = require("../models/user/userModel");
const Comment = require("../models/comment/commentModel");
const { VoteModel } = require("../models");
const { Sequelize } = require('sequelize');

/**
 * 모든 게시판 내용 가져오기
 * GET /api/posts
 */
const getAllPosts = async (req, res) => {
  // const data= await Post.findAll();
  const data = await Post.findAll({
    include: [
      {
        model: Vote,
        as: "votes"
      },
      {
        model: Like,
        as: "likes"
      },
      {
        model: User,
        as: "users"
      }
    ]
  }); // DB에서 모든 데이터를 다 가져옴
  res.status(200).json(data);
  // res.render("showPost", { data });
};

/**
 * 게시판 작성(작성 페이지로 접근하기 위한)
 * GET /api/posts/create
 */
const renderCreatePost = async (req, res) => {
  res.render("addPost");
};

/**
 * 게시판 작성 내용을 DB에 넣기
 * POST /api/posts/create
 */
const createPost = async (req, res) => {
  try {
    const id = req.params.id; // 쿠키로부터 값 가져오는 부분
    const { title, body, vote_content, post_tag } = req.body;
    console.log(title, body, vote_content, post_tag);
    console.log(req.body.post_id);

    // 게시글 생성
    const newPost = await Post.create({
      title: title,
      body: body,
      vote_content: vote_content,
      post_tag: post_tag,
      // user_id: 3 // 쿠키로부터 가져온 id 넣기
      user_id: 1 // 임시로 설정(로그인 된 id를 받아와 자동으로 넣도록 후에 수정할 것)
    });

    console.log("데이터베이스에 값 삽입 완료");
    res.status(200).send("게시물 생성 성공");
  } catch (error) {
    console.log("게시물 생성 중 에러 발생", error);
    res.status(500).send("게시물 생성 중 에러가 발생");
  }
};

/**
 * 모든 게시글 공감, 찬성, 반대 가져오기
 * GET api/posts/{post_id}
 */
const getPostDetail = async (req, res) => {
  const post = await Post.findByPk(req.params.post_id);
  const likesCount = await Like.count({ where: { post_id: req.params.post_id } });
  const comments = await Comment.findAll({ where: { postId: req.params.post_id } });

  if (post) {
    let upvotes = 0;
    let downvotes = 0;
    console.log(upvotes, downvotes);

    if (post.vote_content) {
      console.log(req.params.post_id);
      upvotes = await Vote.count({ where: { post_id: req.params.post_id, vote_type: "upvote" } });
      downvotes = await Vote.count({ where: { post_id: req.params.post_id, vote_type: "downvote" } });
    }
    console.log(upvotes, downvotes);
    res.status(200).json({likesCount, upvotes, downvotes, comments});
    // res.render("showPostDetail", { post, likesCount, upvotes, downvotes, comments });
  } else {
    res.status(404).send("Post not found");
  }
};

/**
 * 댓글 추가 <!-- 서연님이 작성한 코드 활용 --> 사용되지 않는 코드
 * POST /api/posts/:post_id/comment
 */
const addComment = async (req, res) => {
  const id = req.params.id; // 쿠키로부터 값 가져옴
  const postId = req.params.post_id;
  const { content } = req.body;
  // const userId = 100; // 실제 로그인된 사용자 ID로 대체할 것
  const userId= id // 쿠키로부터 받아온 값을 사용

  try {
    await Comment.create({
      userId: userId,
      postId: postId,
      content: content
    });

    res.status(200).send("comment success");
    // res.redirect(`/api/posts/${postId}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while adding the comment.");
  }
};

/**
 * 좋아요 버튼이 눌렸을 때
 * POST /api/posts/:post_id/like
 */
const likePost = async (req, res) => {
  const id = req.params.id; // 쿠키로부터 받아온 값
  const postId = req.params.post_id;
  // const userId = 2; // 실제 로그인된 사용자 ID로 대체할 것
  const userId= id // 쿠키에서 받아온 값 사용

  try {
    const [like, created] = await Like.findOrCreate({
      where: { post_id: postId, user_id: userId },
      defaults: { post_id: postId, user_id: userId }
    });

    if (!created) {
      return res.status(400).send("You have already liked this post.");
    }

    res.status(200).send("like success");
    // res.redirect(`/api/posts/${postId}`);
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred while liking the post.");
  }
};

module.exports = {
  getAllPosts,
  renderCreatePost,
  createPost,
  getPostDetail,
  addComment,
  likePost
};
