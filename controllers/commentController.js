const CommentModel = require("../models/comment/commentModel");
const UserModel = require("../models/user/userModel");
const PostModel = require("../models/post/postModel");

/**
 * 댓글 생성
 * @param {*} userId:num
 * @param {*} postId:num
 * @param {*} content:string
 */
const createComment = async (req, res) => {
    const { userId, postId, content } = req.body;

    if (!content || content.length > 50) {
        return res.status(400).json({ message: "댓글 내용은 필수이며 최대 50자까지 작성 가능합니다." });
    }

    try {
        const user = await UserModel.findByPk(userId);
        const post = await PostModel.findByPk(postId);

        if (!user || !post) {
            return res.status(404).json({ message: "유효하지 않은 사용자 또는 게시글입니다." });
        }

        const comment = await CommentModel.create({
            userId,
            postId,
            content
        });

        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ message: "댓글 생성 중 오류가 발생했습니다", error });
    }
};

/**
 * 댓글 삭제
 * @param {*} commentId:num
 */
const deleteComment = async (req, res) => {
    const { commentId } = req.params;

    try {
        const comment = await CommentModel.findByPk(commentId);

        if (!comment) {
            return res.status(404).json({ message: "댓글을 찾을 수 없습니다." });
        }

        await comment.destroy();
        res.status(200).json({ message: "댓글이 삭제되었습니다." });
    } catch (error) {
        res.status(500).json({ message: "댓글 삭제 중 오류가 발생했습니다", error });
    }
};

/**
 * 특정 게시글의 모든 댓글 조회
 * @param {*} postId:num
 */
const getCommentsByPost = async (req, res) => {
    const { postId } = req.params;

    try {
        const comments = await CommentModel.findAll({
            where: { postId },
            include: [
                {
                    model: UserModel,
                    attributes: ['name', 'nickname']
                }
            ],
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: "댓글 조회 중 오류가 발생했습니다", error });
    }
};

module.exports = { createComment, deleteComment, getCommentsByPost };