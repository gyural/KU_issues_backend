const { DataTypes, Sequelize } = require('sequelize');

class CommentModel extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      // 댓글 작성자 학번 (외래 키)
      userId: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // 게시글 pk (외래 키)
      postId: {
        type: DataTypes.INTEGER,
        allowNull: false,
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