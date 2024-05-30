require('dotenv').config();
const express = require('express');

// const { conn } = require('./db');
const { sequelize } = require("./models/index");

const app = express();
const port = 3000;

sequelize
.sync({force: false})
.then(()=>{
    console.log('데이터베이스 연결 성공')
}).catch(err=>{
    console.log(err)
})

app.use(express.json())
app.use('/api', require('./routers/profileRoute'));
app.use("/api", require("./routers/loginRoute"))
app.use('/api/survey', require("./routers/surveyRoute"))


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});