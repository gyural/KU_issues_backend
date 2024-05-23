require('dotenv').config();
const express = require('express');

const { conn } = require('./db');
const { sequelize } = require("./models/index")

const app = express();
const port = 3000;

sequelize
.sync({force: false})
.then(()=>{
  console.log('데이터 베이스 연결 성공')
}).catch(err=>{
  console.log(err)
})

app.use(express.json())
app.use("/api", require("./routers/registerRoute"))
app.use('/api/survey', require("./routers/surveyRoute"))

app.get('/', async (req, res) => {
    try {
        const connection = await conn;
        const rows = await connection.query('SHOW TABLES');
        res.send(`Database connection successful: ${rows}`);
    } catch (err) {
        res.status(500).send(`Database connection failed: ${err.message}`);
    }
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});