let express = require('express');
let router = express.Router;
let mongoose = require('mongoose');

let db = require('../config/db');
let Survey = require('../models/survey');

// Display survey list
module.exports.displaySurveys = (req, res, next) => {

    Survey.find((error, surveyList) => {
        if (error){
            return console.log(error);
        } else {
            res.render("survey", {title: "Surveys", SurveyList: surveyList})
        }
    })
}

// Display add page
module.exports.displayAddPage = (req, res, next) => {
    res.render('add', { title: 'Add Survey'});
};

// Process add page
module.exports.processAddPage = (req, res, next) => {
    let newSurvey = Survey({
        "name": req.body.name,
        "description": req.body.description
    });
    Survey.create(newSurvey, (err, Survey) => {
        if(err)
        {
            console.log(err); // to show error in the console
            res.end(err); // to stop the server
        }
        else
        {
            // refresh the survey list
            res.redirect('/surveys');
        }
    });
};
