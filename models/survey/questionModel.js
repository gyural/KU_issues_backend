const { DataTypes, Sequelize } = require('sequelize');


class QuestionModel extends Sequelize.Model{
  static init(sequelize){
    return super.init({
      // survye pk 참조
      id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
      }, 
      question:{
        type: DataTypes.STRING,
        allowNull: false
      },
      questionType:{
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      timestamps: true,
      modelName: 'QuestionModel',
      tableName: 'questionModel',
    })
  }
  
}

module.exports = QuestionModel