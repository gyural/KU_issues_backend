const { DataTypes, Sequelize } = require('sequelize');

class VoteResponseModel extends Sequelize.Model {
  static init(sequelize) {
    return super.init({
      // 투표 pk (외래 키)
      voteID: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        unique: true,
        references: {
          model: 'VoteModel', // 투표 테이블
          key: 'voteID'
        }
      },
      // 유저 학번 (외래 키)
      userID: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
        references: {
          model: 'User', // 유저 테이블
          key: 'id' // 학번
        }
      }
    }, {
      sequelize,
      timestamps: false,
      modelName: 'VoteResponseModel',
      tableName: 'voteResponseModel',
    });
  }

  static associate(models) {
    this.belongsTo(models.VoteModel, { foreignKey: 'voteID' });
    this.belongsTo(models.UserModel, { foreignKey: 'User' });
  }
}

module.exports = VoteResponseModel;