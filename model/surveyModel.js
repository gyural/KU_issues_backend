const { DataTypes, Sequelize } = require('sequelize');


class SurveyDocuments extends Sequelize.Model{
  static init(sequelize){
    return super.init({
      id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        unique: true,
      },
      author:{
        type: DataTypes.STRING,
        allowNull: false
      },
      surveyNum:{
        type: DataTypes.INTEGER
      }
    },
    {
      sequelize,
      timestamps: true,
      modelName: 'SurveyDocuments',
      tableName: 'surveydocuments',
    })
  }
  
}

module.exports = SurveyDocuments
