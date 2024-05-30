const { Sequelize } = require('sequelize');

// 모델 모듈
const SurveyModel = require('./survey/surveyModel')
const QuestionModel = require('./survey/questionModel')
const SurveyRes = require('./survey/surveyRes')
const SurveyAns = require('./survey/surveyAns')
const UserModel = require("./user/userModel");

const db = {}
const sequelize = new Sequelize('project', 'user', '1234', {
  host: 'localhost',
  dialect: 'mariadb', // MariaDB 사용
  logging: false // 쿼리 로깅 비활성화
});

// SurveyModel들초기화
SurveyModel.init(sequelize);
QuestionModel.init(sequelize);
SurveyRes.init(sequelize)
SurveyAns.init(sequelize)

// UserModel 초기화
UserModel.init(sequelize)


// 외래 키 관계 설정
SurveyModel.hasMany(QuestionModel, {
  foreignKey: {
    name: 'surveyID',
    allowNull: false // Survey 외래 키는 NOT NULL로 설정
  },
  onDelete: 'CASCADE'
});

QuestionModel.belongsTo(SurveyModel, {
  foreignKey: {
    name: 'surveyID',
    allowNull: false // Survey 외래 키는 NOT NULL로 설정
  }
});

SurveyModel.hasMany(SurveyRes, {
  foreignKey: {
    name: 'surveyID',
    allowNull: false // Survey 외래 키는 NOT NULL로 설정
  },
  onDelete: 'CASCADE'
});

SurveyRes.belongsTo(SurveyModel, {
  foreignKey: {
    name: 'surveyID',
    allowNull: false // Survey 외래 키는 NOT NULL로 설정
  }
});

SurveyRes.hasMany(SurveyAns, {
  foreignKey: {
    name: 'surveyResId',
    allowNull: false // SurveyRes 외래 키는 NOT NULL로 설정
  },
  onDelete: 'CASCADE'
});

SurveyAns.belongsTo(SurveyRes, {
  foreignKey: {
    name: 'surveyResId',
    allowNull: false // SurveyRes 외래 키는 NOT NULL로 설정
  }
});

QuestionModel.hasMany(SurveyAns, {
  foreignKey: {
    name: 'questionID',
    allowNull: false // Question 외래 키는 NOT NULL로 설정
  },
  onDelete: 'CASCADE'
});

SurveyAns.belongsTo(QuestionModel, {
  foreignKey: {
    name: 'questionID',
    allowNull: false // Question 외래 키는 NOT NULL로 설정
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize

// Survey Models
db.SurveyModel = SurveyModel
db.QuestionModel = QuestionModel
db.SurveyRes = SurveyRes
db.SurveyAns = SurveyAns
// User Models
db.UserModel = UserModel

module.exports = db;