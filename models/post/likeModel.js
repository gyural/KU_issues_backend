// models/likeModel.js
const { DataTypes, Model } = require("sequelize");

class Like extends Model {
    static init(sequelize) {
        return super.init(
            {
                id: {
                    type: DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                user_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                post_id: {
                    type: DataTypes.INTEGER,
                    allowNull: false,
                },
                created_at: {
                    type: DataTypes.DATE,
                    defaultValue: DataTypes.NOW,
                },
            },
            {
                sequelize,
                modelName: "Like",
                tableName: "likes",
                timestamps: false,
                underscored: false,
                charset: "utf8",
                collate: "utf8_general_ci",
                indexes: [
                    {
                        unique: true,
                        fields: ['user_id', 'post_id']
                    }
                ]
            }
        );
    }
}

module.exports = Like;