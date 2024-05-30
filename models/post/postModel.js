const { DataTypes, Model } = require("sequelize");

class Post extends Model {
    static init(sequelize) {
        return super.init(
            {
                post_id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                user_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                title: {
                    type: DataTypes.STRING(50),
                    allowNull: false,
                },
                body: {
                    type: DataTypes.STRING(100),
                    allowNull: false,
                },
                vote_content: {
                    type: DataTypes.STRING(100),
                    allowNull: true,
                },
                post_tag: { // 새로운 열 post_tag 추가
                    type: DataTypes.STRING(100),
                    allowNull: true,
                },
                created_at: {
                    type: DataTypes.DATE,
                    defaultValue: DataTypes.NOW,
                },
            },
            {
                sequelize,
                modelName: "Post",
                tableName: "posts",
                timestamps: false,
                underscored: false,
                charset: "utf8",
                collate: "utf8_general_ci",
            }
        );
    }
}

<<<<<<< HEAD
module.exports = Post;
=======
module.exports = Post;
>>>>>>> develop
