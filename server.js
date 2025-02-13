require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const { sequelize } = require("./models/index");
const surveyRouter = require("./routers/surveyRoute");
const postRouter= require("./routers/postRoute");  
const cors = require('cors');

const app = express();
const port = 3005;

sequelize
.sync({ force: false })
.then(()=>{
    console.log('데이터베이스 연결 성공')
}).catch(err=>{
    console.log(err)
})

// EJS 뷰 엔진 설정
app.set('view engine', 'ejs');

// 미들웨어 설정
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // URL-encoded 데이터 파싱

const corsOptions = {
  origin: 'http://localhost:3000', // React 앱의 주소
  credentials: true, // 쿠키를 포함한 요청을 허용
};

app.use(cors(corsOptions));
app.use(express.json())
app.use(cookieParser());
app.use('/api', require('./routers/profileRoute'));
app.use("/api", require("./routers/loginRoute"))
app.use('/api/survey', require("./routers/surveyRoute"))
app.use('/api/comments', require('./routers/commentRoute'));
app.use('/api/votes', require('./routers/voteRoute'));
app.use('/api/posts', postRouter);


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});