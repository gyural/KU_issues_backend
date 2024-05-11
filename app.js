const express = require("express");
const app = express()
const {sequelize} = require("./model/index")


sequelize
  .sync({force: false})
  .then(()=>{
  console.log('데이터 베이스 연결 성공')
}).catch(err=>{
  console.log(err)
})





app.listen(3000, ()=>{
  console.log('서버 실행 중');
})