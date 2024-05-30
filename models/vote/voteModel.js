const { DataTypes, Model } = require("sequelize");

class Vote extends Model {
    static init(sequelize) {
        return super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                post_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                user_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                vote_type: {
                    type: DataTypes.ENUM('upvote', 'downvote'), // 두 가지 타입만 입력받음
                    allowNull: false,
                },
            },
            {
                sequelize,
                modelName: "Vote",
                tableName: "vote",
                timestamps: true,
                underscored: true,
                charset: "utf8",
                collate: "utf8_general_ci",
                indexes: [
                    {
                        unique: true,
                        fields: ['post_id', 'user_id']
                    }
                ]
            }
        );
    }
}

module.exports = Vote;