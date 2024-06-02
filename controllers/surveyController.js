const surveyModel = require('../models/survey/surveyModel')
const questionModel = require('../models/survey/questionModel');
const responseModel = require("../models/survey/surveyRes")
const answerModel = require('../models/survey/surveyAns');

/**
 * POST surveyModel
 * @param {*} req 
 * survey {id:num, author:string, surveyNum :string, questionList: array}
 * questionList [{question: string questionType : int}, ....]
 * questionType 1 : 2 --> 주관식 : 객관식
 */
const createSurveyDoc = async (req, res) => {
  const { author, title, description, questionList } = req.body;
  // 필수 값들이 모두 존재하는지 확인
  if (!author || !title || !description || !questionList) {
    return res.status(400).json({ error: 'author, title, description, and questionList are required' });
  }

  try {
    // 설문 생성
    const survey = await surveyModel.create({
      author: author,
      title: title,
      description: description,
    });

    const questions = await createQuestions(questionList, survey.id)

    // 생성된 설문 및 질문들을 응답으로 반환
    res.status(201).json({survey, questions});
  } catch (error) {
    console.error('Error creating survey:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/** GET All surveyModel 
 * / survey
 * @param {*} req 
 * @param {*} res 
 */
const getSurveyDoc = async(req, res)=>{
  const result = await surveyModel.findAll()
  res.status(200).json(result)
}

/**
 * /survey/:id
 * 설문조사 한개에 대한 정보를 가져오는 함수
 * @param {*} req {id: int}
 * @param {*} res {survey, QeustionList}
 */
const getSurveyOne = async(req, res)=>{
  const {id} = req.params
  if (!id){
    return res.status(400).json({ error: 'id are required' });
  }
  try {
    const survey = await surveyModel.findByPk(id)
    const questionList = await questionModel.findAll({ where: { surveyID: id } })
    
    const result = {survey: survey, questionList: questionList}
    return res.status(200).json(result)

  } catch (error) {
    console.error('Error GET surveyOne:', error);
    return error; // 에러를 상위로 전파하여 호출하는 쪽에서 처리하도록 함
  }

}
/**
 * Create questions
 * @param {*} req {question, questiontype}
 * @param {*} res 
 */
const createQuestions = async (questionList, surveyId) => {
  try {
    const createdQuestions = [];

    // 질문 생성
    await Promise.all(questionList.map(async (question) => {
      const q = await questionModel.create({ 
        question: question.question, 
        questionType: question.questionType, 
        answerList: question.answerList,
        surveyID: surveyId });
      createdQuestions.push(q);
    }));

    return createdQuestions;
  } catch (err) {
    console.error('Error creating questions:', err);
    throw err; // 에러를 상위로 전파하여 호출하는 쪽에서 처리하도록 함
  }
}
/**
 * Post
 * @param {*} req {surveyID, respondnet, answerLIst}
 * @param {*} res 
 * @returns 
 */
const createResponse = async (req, res) => {
  const {surveyID, respondent, answerList} = req.body
  if(!surveyID || !respondent || !answerList){
    return res.status(400).json({ error: 'surveyID, respondent, answerList are required' });
  }

  try {
    const surveyResponse = await responseModel.create({
      respondent: respondent,
      surveyID : surveyID
    })
    
    const surveyAnswer =  await createAnswers(answerList, surveyResponse.surveyID, surveyResponse.id)
    if(surveyAnswer){
      const result = {surveyResponse: surveyResponse, surveyAnswer: surveyAnswer}
      
      return res.status(201).json(result)
    }else{
      return res.status(500).json({message: 'error occured'})
    }
  } catch (error) {
    console.log(error)
    if(surveyResponse){
      await surveyResponse.destroy();
    }

    if(surveyAnswer){
      await Promise.all(surveyAnswer.map(answer=>{answer.destroy()}))
    }
    return res.status(500).json({error: error})
  }

}

/**
 * Module
 * @param {Array} answerList 
 * @param {object} answer of answerList
 * @param {int} answer.questionID
 * @param {string} answer.answer
 * @returns {odjecst[]} surveyAnswers
 */
const createAnswers = async (answer, id, resID) => {
  try {

    // 질문 리스트 가져오기
    let Questions =  await getQuestions(id)
    Questions = Questions.map((item)=> {return item.dataValues})
    const answerList = answer[0]
    
    if(answerList.length !== Questions.length){
      return false
    }
    console.log(answerList)
    // 질문 생성
    const surveyAnswers = await Promise.all(answerList.map(async (surveyAnswer, idx) => {
      const a = await answerModel.create({
        answer: surveyAnswer.answer,
        surveyResId: resID,
        questionID: Questions[idx].id
      });
      return a;
    }));

    return surveyAnswers;
  } catch (err) {
    console.error('Error creating answers:', err);
    throw err; // 에러를 상위로 전파하여 호출하는 쪽에서 처리하도록 함
  }
};


/**
 * Module
 * @param {int} surveyID
 * @returns {Array} questionList by surveyID
 */
const getQuestions = async (surveyID) =>{

  const questionList = await questionModel.findAll({ where: { surveyID: surveyID } })


  return questionList
}

const getSurveyAnswer = async (req, res)=>{
  const {id} = req.params
  if(!id){
    res.status(400).json({ error: 'surveyID are required' });
  }

  try {
    let surveyResponses = await responseModel.findAll({where: {surveyID: id}})
    surveyResponses =surveyResponses.map(res=>{
      return res.dataValues
    })
    const answers = await Promise.all(surveyResponses.map(async (res)=>{
      console.log(res)
      return await answerModel.findAll({where: {surveyResId: res.id}})}
    ))
    return res.status(200).json({surveyResponses, answers})
  } catch (error) {
    return res.status(500).json({error: error})
  }

}
/**
 * GET
 * survey:id/answers
 * @param {*} req 
 * @param {*} res 
 */
const getAnswerCount = async (req, res) =>{
  const {id} = req.params
  
  try {
    let questionList = await questionModel.findAll({ where: { surveyID: id } })
    
    questionList = questionList.map(el => el.dataValues);
    const questionIds = questionList.map(el=>{
      return el.id
    }) 
  
    for (const [idx, el] of questionList.entries()) {
      el.totalAnswers = []
      const answers = await answerModel.findAll({ where: { questionID: questionIds[idx] } });
      
      answers.forEach(element => {
        el.totalAnswers.push(element.answer)
      });
    }
  
    return res.status(200).json(questionList)
    
  } catch (error) {
    throw(error)
  }
}

module.exports = {createSurveyDoc, getSurveyDoc, getSurveyOne, createResponse, getSurveyAnswer,getAnswerCount}