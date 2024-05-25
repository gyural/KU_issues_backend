const express = require('express')
const router = express.Router()
const {createSurveyDoc, getSurveyDoc, 
  getSurveyOne, createResponse, getSurveyAnswer} = require('../controllers/surveyController')

router.post('/', createSurveyDoc)
router.get('/', getSurveyDoc)

router.get('/:id', getSurveyOne)

router.post('/:id/answer', createResponse)
router.get('/:id/answer', getSurveyAnswer)


module.exports = router
