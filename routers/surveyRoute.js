const express = require('express')
const router = express.Router()
const {createSurveyDoc, getSurveyDoc, 
  getSurveyOne, createResponse} = require('../controllers/surveyController')

router.post('/', createSurveyDoc)
router.get('/', getSurveyDoc)

router.get('/:id', getSurveyOne)

router.post('/:id/answer', createResponse)

module.exports = router
