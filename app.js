
.then(()=>{
  console.log('데이터 베이스 연결 성공')
}).catch(err=>{
  console.log(err)
})



// 라우터 설정
app.use('/survey', surveyRouter) // survey로 들어오는 요청을 surveyRouter에서 처리
app.use('/api/posts', postRouter);


