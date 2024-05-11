const surveyDocument = require('../model/surveyModel')

const createSurveyDoc = async()=>{
  await surveyDocument.create({
    id: 1,
    author: "gyu",
    surveyNum: "1"
  })
}

module.exports = {createSurveyDoc}