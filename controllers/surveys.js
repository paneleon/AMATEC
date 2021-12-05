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
            res.render("survey/list", {title: "Surveys", SurveyList: surveyList,  displayName: req.user ? req.user.displayName : ''});
        }
    })
}

// Display add page
module.exports.displayAddPage = (req, res, next) => {
    res.render('survey/add', { title: 'Add Survey',  displayName: req.user ? req.user.displayName : ''});
};

// Process add page
module.exports.processAddPage = (req, res, next) => {

    let newSurvey = Survey({
        "name": req.body.name,
        "description": req.body.description,
        "expirationDate": req.body.expirationDate,
        //TODO: USER ID
        "numberOfQuestions": req.body.numQuestions,
        "numberOfOptions": req.body.numOptions
    });

    
    Survey.create(newSurvey, (err, Survey) => {
        if(err)
        {
            console.log(err); // to show error in the console
            res.end(err); // to stop the server
        }
        else
        {
            console.log("new id", Survey._id);
            console.log("number of questions", Survey.numberOfQuestions);
            res.redirect(`/surveys/add/${Survey._id}/${Survey.numberOfQuestions}/${Survey.numberOfOptions}`);
        }
    });
};

//Displaying edit page
module.exports.displayEditPage = (req,res,next) => {

    //TODO: CHECK USER ID
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

    //TODO: CHECK USER ID
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

    //TODO: CHECK USER ID

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


module.exports.addQuestions = (req, res, next) => {

    let surveyId = req.params.surveyId;
    let numberOfQuestions = parseInt(req.params.numberOfQuestions);
    let numberOfOptions = parseInt(req.params.numberOfOptions);

    let questions = []

    for (let i = 1; i <= numberOfQuestions; i++){
        let options = []

        for (let j = 1; j <= numberOfOptions; j++){
            options.push(req.body[("question" + i + "Option" + j)])
        }

        questions.push({
            title: req.body[("question" + i)],
            options: options
        })
    }

    console.log("questions", questions);
    
    Survey.findByIdAndUpdate(surveyId, { $push: { surveyQuestions: questions } }, (error, survey) => {
        if(error)
        {
            console.log(error);
            res.end(error);
        }
        else
        {
            console.log("updated survey", survey)
            res.redirect('/surveys');
        }
    });
}


module.exports.displayAddQuesionsPage = (req, res, next) => {
    res.render('survey/addQuestions', { title: 'Add Questions', numberOfQuestions: req.params.numberOfQuestions, numberOfOptions: req.params.numberOfOptions});
};

module.exports.testSurveys = (req, res, next) => {

    Survey.find((error, surveys) => {
        if (error){
            return console.log(error);
        } else {
            return res.status(200).send(surveys); 
        }
    })
}