/**
 * Sequelize를 사용하여 DB연결을 설정하고, 각 모델을 초기화하고 관계를 설정
 */

const {Sequelize} = require('sequelize');

// 모델 모듈
const SurveyModel = require('./survey/surveyModel')
const QuestionModel = require('./survey/questionModel')
const SurveyRes = require('./survey/surveyRes')
const SurveyAns = require('./survey/surveyAns')
const UserModel = require("./user/userModel");
const PostModel = require("./post/postModel"); 
const LikeModel = require("./post/likeModel"); 
const VoteModel = require("./post/voteModel");

const db = {}
const sequelize = new Sequelize('project', 'user', '1234', {
  host: 'localhost',
  dialect: 'mariadb', // MariaDB 사용
  logging: false // 쿼리 로깅 비활성화
});



// Model 초기화
SurveyModel.init(sequelize);
QuestionModel.init(sequelize);
SurveyRes.init(sequelize);
SurveyAns.init(sequelize);
UserModel.init(sequelize);
PostModel.init(sequelize); 
LikeModel.init(sequelize);
VoteModel.init(sequelize); // 추가


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


// db 객체에 각 모델 및 Sequelize 설정 추가
db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.SurveyModel = SurveyModel;
db.QuestionModel = QuestionModel;
db.SurveyRes = SurveyRes;
db.SurveyAns = SurveyAns;
db.UserModel = UserModel;
db.PostModel = PostModel; 
db.VoteModel= VoteModel; // 추가

module.exports = db;