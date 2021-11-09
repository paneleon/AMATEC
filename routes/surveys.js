let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let surveysController = require('../controllers/surveys');

// connect to our survey Model
let Survey = require('../models/survey');

/* GET for survey list - READ operation. */
router.get('/', surveysController.displaySurveys);

/* GET for displaying the Add Page - CREATE OPERATION */
router.get('/add-survey', surveysController.displayAddPage);

/* POST for processing the Add Page */
router.post('/add-survey', surveysController.processAddPage);

module.exports = router;