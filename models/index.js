const {Sequelize} = require('sequelize');

// 모델 모듈

const SurveyModel = require('./survey/surveyModel')
const QuestionModel = require('./survey/questionModel')
const SurveyRes = require('./survey/surveyRes')
const SurveyAns = require('./survey/surveyAns')
const UserModel = require("./user/userModel");
const PostModel = require("./post/postModel"); 
const LikeModel = require("./post/likeModel"); // 추가

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
PostModel.init(sequelize); // 추가 
LikeModel.init(sequelize);


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
db.UserModel = UserModel
db.PostModel = PostModel; // 추가

module.exports = db;