let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let surveysController = require('../controllers/surveys');

// connect to our survey Model
let Survey = require('../models/survey');

/* GET for survey list - READ operation. */
router.get('/', surveysController.displaySurveys);

/* GET for survey list - READ operation. */
router.get('/surveys', surveysController.displaySurveys);

/* GET for displaying the Add Page - CREATE OPERATION */
router.get('/add', surveysController.displayAddPage);

/* POST for processing the Add Page */
router.post('/add', surveysController.processAddPage);

/* GET for displaying the Edit Page - UPDATE OPERATION */
router.get('/edit/:id', surveysController.displayEditPage);

/* POST for processing the Edit Page */
router.post('/edit/:id', surveysController.processEditPage);

/* GET for performing the Deletion - DELETE OPERATION */
router.get('/delete/:id', surveysController.performDeletion);

module.exports = router;