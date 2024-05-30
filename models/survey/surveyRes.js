const { DataTypes, Sequelize } = require('sequelize');


class SurveyRes extends Sequelize.Model{
  static init(sequelize){
    return super.init({
      id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      respondent:{
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: true,
      modelName: 'SurveyRes',
      tableName: 'surveyRes',
    })
  }
  
}

module.exports = SurveyRes