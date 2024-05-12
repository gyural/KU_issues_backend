const { Sequelize } = require('sequelize');

// 모델 모듈
const SurveyDocuments = require('./surveyModel')

const db = {}
const sequelize = new Sequelize('kuissue', 'root', '1234', {
  host: 'localhost',
  dialect: 'mariadb', // MariaDB 사용
  logging: false // 쿼리 로깅 비활성화
});

db.sequelize = sequelize;
db.SurveyDocuments = SurveyDocuments

SurveyDocuments.init(sequelize)




module.exports = db;