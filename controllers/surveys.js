let express = require('express');
let router = express.Router;
let mongoose = require('mongoose');

let db = require('../config/db');
let Survey = require('../models/survey');

module.exports.displaySurveys = (req, res, next) => {

    Survey.find((error, surveyList) => {
        if (error){
            return console.log(error);
        } else {
            res.render("survey", {title: "Our Surveys", SurveyList: surveyList})
        }
    })
}
