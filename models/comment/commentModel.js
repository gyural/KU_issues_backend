const { DataTypes, Model } = require("sequelize");

class Comment extends Model {
    static init(sequelize) {
        return super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                // 댓글 작성자 학번 (외래 키)
                userId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: 'User',
                        key: 'id'
                    }
                },
                // 게시글 pk (외래 키)
                postId: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                    references: {
                        model: 'Post',
                        key: 'id'
                    }
                },
                // 댓글 내용, 최대 50글자
                content: {
                    type: DataTypes.STRING(50),
                    allowNull: false
                },
                // 시간
                createdAt: {
                    type: DataTypes.DATE,
                    allowNull: false,
                    defaultValue: DataTypes.NOW
                }
            },
            {
                sequelize,
                modelName: "Comment",
                tableName: "comments", // 수정된 부분
                timestamps: true,
                updatedAt: false, // updatedAt 사용하지 않음
                underscored: false,
                charset: "utf8",
                collate: "utf8_general_ci",
            }
        );
    }
}

module.exports = Comment;
