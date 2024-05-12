const express = require('express')
const router = express.Router()
const {createSurveyDoc, getSurveyDoc} = require('../controllers/surveyController')

router.post('/', createSurveyDoc)
router.get('/', getSurveyDoc)

module.exports = router
