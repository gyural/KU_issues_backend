const surveyDocument = require('../models/surveyModel')

/**
 * 
 * @param {*} id:num
 * @param {*} author:string 
 * @param {*} surveyNum :string
 */
const createSurveyDoc = async(req, res)=>{
  const {id, author, surveyNum} =req.body
  console.log(id, author, surveyNum)
  const result = await surveyDocument.create({
    id: id,
    author: author,
    surveyNum: surveyNum
  })
  
  res.status(201).json(result)
}

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
const getSurveyDoc = async(req, res)=>{
  const result = await surveyDocument.findAll()
  res.status(200).json(result)


}

module.exports = {createSurveyDoc, getSurveyDoc}