let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

let surveysController = require('../controllers/surveys');

//helper function for guard purposes
function requireAuth(req, res, next)
{
    //check if the user is logged in
    if(!req.isAuthenticated())
    {
        return res.redirect('/login');
    }
    next();
}

// connect to our survey Model
let Survey = require('../models/survey');

/* GET for survey list - READ operation. */
router.get('/', requireAuth, surveysController.displaySurveys);

router.get('/test', surveysController.testSurveys);

/* GET for displaying the Add Page - CREATE OPERATION */
router.get('/add', requireAuth, surveysController.displayAddPage);

/* POST for processing the Add Page */
router.post('/add',  requireAuth, surveysController.processAddPage);

router.get('/add/:surveyId/:numberOfQuestions/:numberOfOptions', requireAuth, surveysController.displayAddQuesionsPage)

router.post('/add/:surveyId/:numberOfQuestions/:numberOfOptions', requireAuth, surveysController.addQuestions);

/* GET for displaying the Edit Page - UPDATE OPERATION */
router.get('/edit/:id',  requireAuth, surveysController.displayEditPage);

/* POST for processing the Edit Page */
router.post('/edit/:id',  requireAuth, surveysController.processEditPage);

/* GET for performing the Deletion - DELETE OPERATION */
router.get('/delete/:id',  requireAuth, surveysController.performDeletion);

/* GET for displaying the complete a survey Page - READ OPERATION */
router.get('/published',  requireAuth, surveysController.displayPublished);

/* GET for displaying the do survey page */
router.get('/doSurvey/:id', requireAuth, surveysController.displayDoSurveyPage);

router.post('/doSurvey/:id', requireAuth, surveysController.completeSurvey);

router.get('/completed', requireAuth,  surveysController.displayCompletedSurveys)

module.exports = router;