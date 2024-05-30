require('dotenv').config();
const express = require('express');

const { sequelize } = require("./models/index");

const app = express();
const port = 3000;

sequelize
.sync({force: true})
.then(()=>{
    console.log('데이터베이스 연결 성공')
}).catch(err=>{
    console.log(err)
})

app.use(express.json())
app.use('/api', require('./routers/profileRoute'));
app.use("/api", require("./routers/loginRoute"))
app.use('/api/survey', require("./routers/surveyRoute"))
app.use('/api/comments', require('./routers/commentRoute'));
app.use('/api/votes', require('./routers/voteRoute'));
app.use('/api/posts', require('./routers/postRoute'))

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});