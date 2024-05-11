const express = require("express");
const maria = require("./config/database")
const app = express()





app.listen(3000, ()=>{
  console.log('서버 실행 중');
})