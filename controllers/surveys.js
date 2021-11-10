let express = require('express');
let router = express.Router;
let mongoose = require('mongoose');

let db = require('../config/db');
const survey = require('../models/survey');
let Survey = require('../models/survey');

// Display survey list
module.exports.displaySurveys = (req, res, next) => {

    Survey.find((error, surveyList) => {
        if (error){
            return console.log(error);
        } else {
            res.render("survey/list", {title: "Surveys", SurveyList: surveyList})
        }
    })
}

// Display add page
module.exports.displayAddPage = (req, res, next) => {
    res.render('surveys/add', { title: 'Add Survey'});
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
            res.render('survey/edit', {title: 'Edit Survey', surveys:surveyToEdit,
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
module.exports.performDeletion = (req, res, next) => {
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
    })
}
