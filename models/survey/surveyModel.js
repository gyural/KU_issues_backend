const { DataTypes, Sequelize } = require('sequelize');


class SurveyModel extends Sequelize.Model{
  static init(sequelize){
    return super.init({
      id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      author:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      title:{
        type: DataTypes.STRING,
        allowNull: false
      },
      description:{
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      sequelize,
      timestamps: true,
      modelName: 'SurveyModel',
      tableName: 'surveyModel',
    })
  }
  
}

module.exports = SurveyModel