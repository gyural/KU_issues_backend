const {Sequelize} = require('sequelize');

// 모델 모듈
const SurveyModel = require('./surveyModel')
const QuestionModel = require('./questionModel')

const db = {}
const sequelize = new Sequelize('kuissue', 'root', '1234', {
  host: 'localhost',
  dialect: 'mariadb', // MariaDB 사용
  logging: false // 쿼리 로깅 비활성화
});


// SurveyModel 초기화
SurveyModel.init(sequelize);

// QuestionModel 초기화
QuestionModel.init(sequelize);

// 관계 설정
SurveyModel.hasMany(QuestionModel, {
  foreignKey: 'surveyModelId',
  onDelete: 'CASCADE'
});
QuestionModel.belongsTo(SurveyModel, {
  foreignKey: 'surveyModelId'
});

db.sequelize = sequelize;
db.Sequelize = Sequelize
db.SurveyModel = SurveyModel
db.QuestionModel = QuestionModel


module.exports = db;