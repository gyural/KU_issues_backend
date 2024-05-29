const { DataTypes, Sequelize } = require('sequelize');

class VoteModel extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      // 투표 pk
      voteID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true
      },
      // 게시글 pk (외래 키)
      postID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'PostModel', // 게시글 테이블
          key: 'id'
        }
      },
      // 찬성수
      prosCnt: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      // 반대수
      consCnt: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      }
    }, {
      sequelize,
      timestamps: false,
      modelName: 'VoteModel',
      tableName: 'voteModel',
    });
  }
}

module.exports = VoteModel;