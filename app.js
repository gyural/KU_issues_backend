const express = require("express");
const app = express()
const {sequelize} = require("./models/index")
const surveyRouter = require("./routers/surveyRoute")
const postRouter= require("./routers/postRoute");
const commentRouter = require("./routers/commentRoute");
const voteRouter = require("./routers/voteRoute");

sequelize
.sync({force: true})
.then(()=>{
  console.log('데이터 베이스 연결 성공')
}).catch(err=>{
  console.log(err)
})

app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // URL-encoded 데이터 파싱

// 라우터 설정
app.use('/survey', surveyRouter) // survey로 들어오는 요청을 surveyRouter에서 처리
app.use('/api/posts', postRouter);

app.use('/api/posts', postRouter);


app.listen(3000, ()=>{
  console.log('서버 실행 중');
})