const CommentModel = require("../models/comment/commentModel");
const UserModel = require("../models/user/userModel");
const PostModel = require("../models/post/postModel");

/**
 * 특정 게시글의 모든 댓글 조회
 * @param {*} req
 * @param {*} res
 */
const getCommentsByPost = async (req, res) => {
    const { post_id } = req.params;

    try {
        const comments = await CommentModel.findAll({
            where: { postId: post_id },
            include: [
                {
                    model: UserModel,
                    attributes: ['name', 'nickname'] // UserModel에 필요한 속성
                }
            ],
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json(comments);
    } catch (error) {
        console.error("댓글 조회 중 오류가 발생했습니다:", error);
        res.status(500).json({ message: "댓글 조회 중 오류가 발생했습니다" });
    }
};

/**
 * 댓글 생성
 * @param {*} req
 * @param {*} res
 */
const createComment = async (req, res) => {
    const { content } = req.body;
    const user_id = req.user.id;
    const { post_id } = req.params;
    // //const { content } = req.body;
    // const { user_id, content } = req.body;
    // const { post_id } = req.params;
    // //const userId = 1; //

    if (!content || content.length > 50) {
        return res.status(400).json({ message: "댓글 내용은 필수이며 최대 50자까지 작성 가능합니다." });
    }

    try {
        const user = await UserModel.findByPk(userId);
        const post = await PostModel.findByPk(post_id);

        if (!user || !post) {
            return res.status(404).json({ message: "유효하지 않은 사용자 또는 게시글입니다." });
        }

        const comment = await CommentModel.create({
            userId,
            postId: post_id,
            content
        });

        res.status(201).json(comment);
    } catch (error) {
        console.error("댓글 생성 중 오류가 발생했습니다:", error);
        res.status(500).json({ message: "댓글 생성 중 오류가 발생했습니다" });
    }
};

/**
 * 댓글 삭제
 * @param {*} req
 * @param {*} res
 */
const deleteComment = async (req, res) => {
    const { comment_id } = req.params;

    try {
        const comment = await CommentModel.findByPk(comment_id);

        if (!comment) {
            return res.status(404).json({ message: "댓글을 찾을 수 없습니다." });
        }

        await comment.destroy();
        res.status(200).json({ message: "댓글이 삭제되었습니다." });
    } catch (error) {
        console.error("댓글 삭제 중 오류가 발생했습니다:", error);
        res.status(500).json({ message: "댓글 삭제 중 오류가 발생했습니다" });
    }
};

module.exports = { getCommentsByPost, createComment, deleteComment };


// const CommentModel = require("../models/comment/commentModel");
// const UserModel = require("../models/user/userModel");
// const PostModel = require("../models/post/postModel");

// /**
//  * 특정 게시글의 모든 댓글 조회
//  * @param {*} req
//  * @param {*} res
//  */
// const getCommentsByPost = async (req, res) => {
//     const { post_id } = req.params;

//     try {
//         const comments = await CommentModel.findAll({
//             where: { postId: post_id },
//             include: [
//                 {
//                     model: UserModel,
//                     attributes: ['name', 'nickname'] // UserModel에 필요한 속성
//                 }
//             ],
//             order: [['createdAt', 'DESC']]
//         });

//         res.status(200).json(comments);
//     } catch (error) {
//         console.error("댓글 조회 중 오류가 발생했습니다:", error);
//         res.status(500).json({ message: "댓글 조회 중 오류가 발생했습니다" });
//     }
// };

// /**
//  * 댓글 생성
//  * @param {*} req
//  * @param {*} res
//  */
// const createComment = async (req, res) => {
//     const { content } = req.body;
//     const { post_id } = req.params;
//     const userId = 1; //

//     if (!content || content.length > 50) {
//         return res.status(400).json({ message: "댓글 내용은 필수이며 최대 50자까지 작성 가능합니다." });
//     }

//     try {
//         const user = await UserModel.findByPk(userId);
//         const post = await PostModel.findByPk(post_id);

//         if (!user || !post) {
//             return res.status(404).json({ message: "유효하지 않은 사용자 또는 게시글입니다." });
//         }

//         const comment = await CommentModel.create({
//             userId,
//             postId: post_id,
//             content
//         });

//         res.status(201).json(comment);
//     } catch (error) {
//         console.error("댓글 생성 중 오류가 발생했습니다:", error);
//         res.status(500).json({ message: "댓글 생성 중 오류가 발생했습니다" });
//     }
// };

// /**
//  * 댓글 삭제
//  * @param {*} req
//  * @param {*} res
//  */
// const deleteComment = async (req, res) => {
//     const { comment_id } = req.params;

//     try {
//         const comment = await CommentModel.findByPk(comment_id);

//         if (!comment) {
//             return res.status(404).json({ message: "댓글을 찾을 수 없습니다." });
//         }

//         await comment.destroy();
//         res.status(200).json({ message: "댓글이 삭제되었습니다." });
//     } catch (error) {
//         console.error("댓글 삭제 중 오류가 발생했습니다:", error);
//         res.status(500).json({ message: "댓글 삭제 중 오류가 발생했습니다" });
//     }
// };

// module.exports = { getCommentsByPost, createComment, deleteComment };
