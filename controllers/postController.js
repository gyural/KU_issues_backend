// // const surveyModel = require('../models/survey/surveyModel')

// /**
//  * 
//  * @param {*} id:num
//  * @param {*} author:string 
//  * @param {*} surveyNum :string
//  */
// const createSurveyDoc = async(req, res)=>{
//   const {author, title, description} =req.body
//   console.log(author, title, description)
//   const result = await surveyModel.create({
//     author: author,
//     title: title,
//     description: description,
//   })
  
//   res.status(201).json(result)
// }

// /**
//  * 
//  * @param {*} req 
//  * @param {*} res 
//  */
// const getSurveyDoc = async(req, res)=>{
//   const result = await surveyModel.findAll()
//   res.status(200).json(result)

// }

// module.exports = {createSurveyDoc, getSurveyDoc}