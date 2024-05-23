const surveyModel = require('../models/survey/surveyModel')
const questionModel = require('../models/survey/questionModel');

/**
 * POST surveyModel
 * @param {*} req 
 * survey {id:num, author:string, surveyNum :string, questionList: array}
 * questionList [{question: string questionType : int}, ....]
 * questionType 1 : 2 --> 주관식 : 객관식
 */
const createSurveyDoc = async (req, res) => {
  const { author, title, description, questionList } = req.body;
  console.log(author, title, description, questionList)
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
    console.log(survey.id)
    const questions = await createQuestions(questionList, survey.id)

    // 생성된 설문 및 질문들을 응답으로 반환
    res.status(201).json({survey, questions});
  } catch (error) {
    console.error('Error creating survey:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

/** GET surveyModel 
 *
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
    const questionList = await questionModel.findAll({ where: { surveyModelId: id } })
    
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
      const q = await questionModel.create({ question: question.question, questionType: question.questionType, 
                                                      surveyModelId: surveyId });
      createdQuestions.push(q);
    }));

    return createdQuestions;
  } catch (err) {
    console.error('Error creating questions:', err);
    throw err; // 에러를 상위로 전파하여 호출하는 쪽에서 처리하도록 함
  }
}
module.exports = {createSurveyDoc, getSurveyDoc, getSurveyOne}