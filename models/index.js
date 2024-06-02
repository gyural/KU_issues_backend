const { Sequelize } = require('sequelize');

// 모델 모듈
const SurveyModel = require('./survey/surveyModel')
const QuestionModel = require('./survey/questionModel')
const SurveyRes = require('./survey/surveyRes')
const SurveyAns = require('./survey/surveyAns')
const UserModel = require("./user/userModel");
const PostModel = require("./post/postModel"); 
const LikeModel = require("./post/likeModel"); 
const VoteModel = require("./post/voteModel");
const CommentModel = require("./comment/commentModel");

const db = {}
const sequelize = new Sequelize('project', 'root', '1234', {
  host: 'db',
  port: 3306,
  dialect: 'mariadb', // MariaDB 사용
  logging: false // 쿼리 로깅 비활성화
});

// SurveyModel들초기화
SurveyModel.init(sequelize);
QuestionModel.init(sequelize);
SurveyRes.init(sequelize);
SurveyAns.init(sequelize);
UserModel.init(sequelize);
PostModel.init(sequelize); 
LikeModel.init(sequelize);
VoteModel.init(sequelize); // 추가
CommentModel.init(sequelize);


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


// 직접 추가한 부분----------------------------------------------------------
// 외래 키 관계 설정

// users - posts (id)
UserModel.hasMany(PostModel, {
  as: "posts",
  foreignKey: {
    name: 'user_id', // 외래 키 이름은 user_id
    allowNull: false // user_id 외래 키는 NOT NULL로 설정
  },
  onDelete: 'CASCADE' // User가 삭제되면 연결된 모든 Post도 함께 삭제됨
});

PostModel.belongsTo(UserModel, {
  as: "users",
  foreignKey: {
    name: 'user_id', // 외래 키 이름은 user_id
    allowNull: false // user_id 외래 키는 NOT NULL로 설정
  }
});

//-----------------------------------------------------------------------
// users - likes (id, post_id)
UserModel.hasMany(LikeModel, {
  foreignKey: {
    name: 'user_id', // 외래 키 이름은 user_id
    allowNull: false // user_id 외래 키는 NOT NULL로 설정
  },
  onDelete: 'CASCADE' // User가 삭제되면 연결된 모든 Like도 함께 삭제됨
});

LikeModel.belongsTo(UserModel, {
  foreignKey: {
    name: 'user_id', // 외래 키 이름은 user_id
    allowNull: false // user_id 외래 키는 NOT NULL로 설정
  }
});

PostModel.hasMany(LikeModel, {
  as: "likes",
  foreignKey: {
    name: 'post_id', // 외래 키 이름은 post_id
    allowNull: false // post_id 외래 키는 NOT NULL로 설정
  },
  onDelete: 'CASCADE' // Post가 삭제되면 연결된 모든 Like도 함께 삭제됨
});



LikeModel.belongsTo(PostModel, {
  as: 'posts',
  foreignKey: {
    name: 'post_id', // 외래 키 이름은 post_id
    allowNull: false // post_id 외래 키는 NOT NULL로 설정
  }
});


// users - comments (id, post_id)
UserModel.hasMany(CommentModel, {
  foreignKey: {
    name: 'userId', // 외래 키 이름은 userId
    allowNull: false // userId 외래 키는 NOT NULL로 설정
  },
  onDelete: 'CASCADE' // User가 삭제되면 연결된 모든 Comment도 함께 삭제됨
});

PostModel.hasMany(CommentModel, {
  foreignKey: {
    name: 'postId', // 외래 키 이름은 postId
    allowNull: false // postId 외래 키는 NOT NULL로 설정
  },
  onDelete: 'CASCADE' // Post가 삭제되면 연결된 모든 Comment도 함께 삭제됨
});

CommentModel.belongsTo(UserModel, {
  foreignKey: {
    name: 'userId', // 외래 키 이름은 userId
    allowNull: false // userId 외래 키는 NOT NULL로 설정
  }
});

CommentModel.belongsTo(PostModel, {
  foreignKey: {
    name: 'postId', // 외래 키 이름은 postId
    allowNull: false // postId 외래 키는 NOT NULL로 설정
  }
});

// 나중에 추가한 부분
// users - votes (id)
UserModel.hasMany(VoteModel, {
  foreignKey: {
    name: 'user_id', // 외래 키 이름은 user_id
    allowNull: false // user_id 외래 키는 NOT NULL로 설정
  },
  onDelete: 'CASCADE' // User가 삭제되면 연결된 모든 Vote도 함께 삭제됨
});

VoteModel.belongsTo(UserModel, {
  foreignKey: {
    name: 'user_id', // 외래 키 이름은 user_id
    allowNull: false // user_id 외래 키는 NOT NULL로 설정
  }
});

// posts - votes (post_id)
PostModel.hasMany(VoteModel, {
  as: "votes",
  onDelete: 'CASCADE' // Post가 삭제되면 연결된 모든 Vote도 함께 삭제됨
});

VoteModel.belongsTo(PostModel, {
  as: 'post'
});

// 직접 추가한 부분----------------------------------------------------------


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
db.CommentModel= this.CommentModel;

module.exports = db;