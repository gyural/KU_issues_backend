const { DataTypes, Sequelize } = require('sequelize');


class SurveyAns extends Sequelize.Model{
  static init(sequelize){
    return super.init({
      id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      answer:{
        type: DataTypes.STRING,
        allowNull: false,
      }
    },
    {
      sequelize,
      timestamps: true,
      modelName: 'SurveyAns',
      tableName: 'surveyAns',
    })
  }
  
}

module.exports = SurveyAns