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

module.exports = Post;
