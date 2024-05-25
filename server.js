require('dotenv').config();
const express = require('express');

const { conn } = require('./db');
const { sequelize } = require("./models/index")
const { User } = require('./models/user/userModel'); // 추가

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

// app.use("/api", require("./routers/loginRoute")) // 1. 수정 - loginRoute로 수정 2. 전체 주석
app.use('/api/survey', require("./routers/surveyRoute"))

app.get('/', async (req, res) => {
    try {
        const connection = await conn;
        await connection.query('USE project'); // 추가 - project 데이터베이스 선택
        const rows = await connection.query('SHOW TABLES');
        res.send(`Database connection successful: ${rows}`);
    } catch (err) {
        res.status(500).send(`Database connection failed: ${err.message}`);
    }
})

// 추가 - /profile
app.get('/profile', async (req, res) => {
    try {
        const user = await User.findOne({
            where: { id: req.user.id },
            attributes: ['id', 'name', 'nickname', 'grade']
        });
  
        // 사용자가 존재하지 않는 경우
        if (!user) {
            return res.status(404).send('User not found');
        }
  
        // 사용자가 존재하는 경우
        res.json(user);
    } catch (err) {
        console.error('Error fetching profile:', err);
        res.status(500).send('Error 500');
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});