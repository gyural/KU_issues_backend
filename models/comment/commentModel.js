const { DataTypes, Sequelize } = require('sequelize');

class CommentModel extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
        defaultValue: Sequelize.NOW
      }
    }, {
      sequelize,
      timestamps: true,
      modelName: 'CommentModel',
      tableName: 'commentModel',
    });
  }
}

module.exports = CommentModel;