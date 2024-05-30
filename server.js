require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const { sequelize } = require("./models/index");

const app = express();
const port = 3000;

sequelize
<<<<<<< HEAD
.sync({force: false})
=======
.sync({ force: false })
>>>>>>> bc419432038e17cc4838e763b89b0a2151b2c6f0
.then(()=>{
    console.log('데이터베이스 연결 성공')
}).catch(err=>{
    console.log(err)
})

app.use(express.json())
app.use(cookieParser());
app.use('/api', require('./routers/profileRoute'));
app.use("/api", require("./routers/loginRoute"))
app.use('/api/survey', require("./routers/surveyRoute"))
app.use('/api/comments', require('./routers/commentRoute'));
app.use('/api/votes', require('./routers/voteRoute'));
app.use('/api/posts', require('./routers/postRoute'));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});