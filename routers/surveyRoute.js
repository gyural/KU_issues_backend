const express = require('express')
const router = express.Router()
const {createSurveyDoc, getSurveyDoc, 
  getSurveyOne, createResponse, getSurveyAnswer
, getAnswerCount} = require('../controllers/surveyController')

router.post('/', createSurveyDoc)
router.get('/', getSurveyDoc)

router.get('/:id', getSurveyOne)

router.post('/:id/answer', createResponse)
router.get('/:id/answer', getSurveyAnswer)

router.get('/report/:id', getAnswerCount)

module.exports = router