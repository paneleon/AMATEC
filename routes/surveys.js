let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let surveysController = require('../controllers/surveys');

// connect to our survey Model
let Survey = require('../models/survey');

/* GET for survey list - READ operation. */
router.get('/', surveysController.displaySurveys);

/* GET Route for displaying the Edit Page - UPDATE Operation */
router.get('/edit/:id', surveysController.displayEditPage);

/* POST Route for processing the Edit page - UPDATE Operation */
router.post('/edit/:id', surveysController.processEditPage);

/* GET Route to perform Surveys DELETION - DELETE Operation */
router.get('/delete/:id', surveysController.performDelete);

module.exports = router;