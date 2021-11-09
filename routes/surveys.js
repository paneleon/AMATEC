let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');

// connect to our survey Model
let Survey = require('../models/survey');

/* GET for survey list - READ operation. */
router.get('/', (req, res, next) => {

    Survey.find((err, surveyList) => {
        if (err) {
            return console.error(err);
        } else {
            
           res.render('survey', {title: 'Survey List', SurveyList : surveyList});
        }
    });

});

module.exports = router;