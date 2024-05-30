// /**
//  * Express.js를 사용하여 웹서버 설정, Sequelize를 통해 DB 연결
//  */
// const express = require("express");
// const app = express();
// const {sequelize} = require("./models/index");
// const surveyRouter = require("./routers/surveyRoute");
// const postRouter= require("./routers/postRoute");   

// // DB 연결 설정
// sequelize
// .sync({force: false})
// .then(()=>{
//   console.log('데이터 베이스 연결 성공')
// }).catch(err=>{
//   console.log(err)
// })

// // EJS 뷰 엔진 설정
// app.set('view engine', 'ejs');

// // 미들웨어 설정
// app.use(express.json());
// app.use(express.urlencoded({ extended: true })); // URL-encoded 데이터 파싱

// // 라우터 설정
// app.use('/survey', surveyRouter) // survey로 들어오는 요청을 surveyRouter에서 처리
// app.use('/api/posts', postRouter);

// // 서버 실행
// app.listen(3000, ()=>{
//   console.log('서버 실행 중');
// })
