const express = require('express')
const router = express.Router()
const {createSurveyDoc, getSurveyDoc, getSurveyOne} = require('../controllers/surveyController')

router.post('/', createSurveyDoc)
router.get('/', getSurveyDoc)
router.get('/:id', getSurveyOne)


module.exports = router
