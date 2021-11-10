let express = require('express');
let router = express.Router;
let mongoose = require('mongoose');

let db = require('../config/db');
const survey = require('../models/survey');
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

//Displaying edit page
module.exports.displayEditPage = (req,res,next) => {
    let id = req.params.id;

    Survey.findById(id, (err, surveyToEdit) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view  
            res.render('edit', {title: 'Edit Survey', surveys:surveyToEdit,
        displayName: req.user ? req.user.displayName: ''});
        }
    });
};

//Processing Edit Page
module.exports.processEditPage = (req,res,next) => {
    let id = req.params.id;
    let editedSurvey = Survey({
        "_id": id,
        "name": req.body.name,
        "description": req.body.description
    });
    Survey.updateOne({_id: id}, editedSurvey, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else{
            //refresh the survey list
            res.redirect('/surveys');
        }
    });
};

//Deleting the Survey
module.exports.performDelete = (req,res,next) => {
    let id = req.params.id;

    Survey.remove({_id: id}, (err) => {
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh the survey list
            res.redirect('/surveys');
        }
    });
};
