const {Sequelize} = require('sequelize');

// 모델 모듈
const SurveyModel = require('./survey/surveyModel')
const QuestionModel = require('./survey/questionModel')
const SurveyRes = require('./survey/surveyRes')
const SurveyAns = require('./survey/surveyAns')

const db = {}
const sequelize = new Sequelize('kuissue', 'root', '1234', {
  host: 'localhost',
  dialect: 'mariadb', // MariaDB 사용
  logging: false // 쿼리 로깅 비활성화
});


// SurveyModel들초기화
SurveyModel.init(sequelize);
QuestionModel.init(sequelize);
SurveyRes.init(sequelize)
SurveyAns.init(sequelize)

// 관계 설정
SurveyModel.hasMany(QuestionModel, {
  foreignKey: 'surveyModelId',
  onDelete: 'CASCADE'
});
QuestionModel.belongsTo(SurveyModel, {
  foreignKey: 'surveyModelId'
});
QuestionModel.hasMany(SurveyRes, {
  foreignKey: 'questionId',
  onDelete: 'CASCADE'
})
SurveyRes.belongsTo(QuestionModel,{
  foreignKey: 'questionId'
})
SurveyRes.hasMany(SurveyAns,{
  foreignKey: 'surveyResId',
  onDelete: 'CASCADE'
})
SurveyAns.belongsTo(SurveyRes,{
  foreignKey: 'surveyResId'
})


db.sequelize = sequelize;
db.Sequelize = Sequelize
db.SurveyModel = SurveyModel
db.QuestionModel = QuestionModel
db.SurveyRes = SurveyRes
db.SurveyAns = SurveyAns

module.exports = db;