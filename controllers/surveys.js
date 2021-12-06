let express = require('express');
let router = express.Router;
let mongoose = require('mongoose');

let db = require('../config/db');
const survey = require('../models/survey');
let Survey = require('../models/survey');
let CompletedSurvey = require('../models/completedSurvey');

// Display survey list
module.exports.displaySurveys = (req, res, next) => {

    Survey.find((error, surveyList) => {
        if (error){
            return console.log(error);
        } else {
            console.log("this is the user", req.user.displayName)
            res.render("survey/list", {title: "Surveys", SurveyList: surveyList,  displayName: req.user ? req.user.displayName : '', 
            errorMessage: "", loggedUserId: req.user._id});
        }
    })
}

// Display add page
module.exports.displayAddPage = (req, res, next) => {
    res.render('survey/add', { title: 'Add Survey',  displayName: req.user ? req.user.displayName : ''});
};

// Process add page
module.exports.processAddPage = (req, res, next) => {

    console.log("this is the user", req.user);

    let newSurvey = Survey({
        "name": req.body.name,
        "description": req.body.description,
        "expirationDate": req.body.expirationDate,
        "createdBy": req.user._id,
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
            if (req.user._id == surveyToEdit.createdBy){
                res.render('survey/edit', {title: 'Edit Survey', surveys:surveyToEdit, displayName: req.user ? req.user.displayName: ''});
                console.log("all good with editing the survey");
            } else {
                console.log("you can't edit this survey");
                // return res.render("survey/list", {title: "Surveys", SurveyList: surveyList,  displayName: req.user ? req.user.displayName : '', 
                // errorMessage: "This Survey belongs to another user!"});
                res.redirect('/surveys');
            }
        }
    });
};

//Processing Edit Page
module.exports.processEditPage = (req,res,next) => {

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
            let questions = []

            for (let i = 1; i <= surveyToEdit.numberOfQuestions; i++){
                let options = []
                for (let j = 1; j <= surveyToEdit.numberOfOptions; j++){
                    options.push(req.body[("question" + i + "Option" + j)])
                }
                questions.push({
                    title: req.body[("question" + i)],
                    options: options
                })
            }

            let editedSurvey = Survey({
                "_id": id,
                "name": req.body.name,
                "description": req.body.description,
                "surveyQuestions": questions,
                "expirationDate":  req.body.expirationDate
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
        }
    });
};

//Deleting the Survey
module.exports.performDeletion = (req, res, next) => {

    //TODO: CHECK USER ID

    let id = req.params.id;

    Survey.findById(id, (error, survey) => {
        if(error)
        {
            console.log(error);
            res.end(error);
        } else {

            if (req.user._id == survey.createdBy){
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
            } else {
                console.log("You can't delete this survey");
                res.redirect('/surveys');

                // return res.render("survey/list", {title: "Surveys", SurveyList: surveyList,  displayName: req.user ? req.user.displayName : '', 
                // errorMessage: "This Survey belongs to another user!"});
            }
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


module.exports.displayPublished = (req, res, next) => 
{
    Survey.find((err, surveyList) => {
        if (err)
        {
            return cosnole.log('Error retrieving surveys: ' + err);
        }
        else 
        {
            res.render('survey/published', {title: 'Surveys', SurveyList: surveyList, displayName: req.user ? req.user.displayName : ''});
        }
    })
}

module.exports.displayDoSurveyPage = (req, res, next) => {
    let id = req.params.id;

    Survey.findById(id, (err, surveyToComplete) => {
        if(err)
        {
            console.log('Error retrieving survey: ' + err);
            res.end(err);
        }
        else
        {
            res.render('survey/doSurvey', {title: 'Complete Survey', survey: surveyToComplete, displayName: req.user ? req.user.displayName : ''});
        }
    });
}

module.exports.completeSurvey = (req, res, next) => {

    let surveyId = req.params.id;
    let userCompleted = req.user._id;
    let answers = [];

    Survey.findById(surveyId, (error, survey) => {
        if (error){
            return console.log(error);
        } else {
            let numberOfQuestions = survey.numberOfQuestions;
            console.log("number of questions", numberOfQuestions);

            for (let i = 0; i < numberOfQuestions; i++){

                answers.push({
                    "question": req.body["question" + (i + 1)][0],
                    "answer": req.body["question" + (i + 1)][1]
                })
            }

            let newCompletedSurvey = CompletedSurvey({
                "surveyId": surveyId,
                "completedBy": userCompleted,
                "answers":  answers
            })

            CompletedSurvey.create(newCompletedSurvey, (error, completedSurvey) => {
                if (error){
                    console.log(error);
                    res.end(error);
                } else {
                    console.log("sucessfully created completed survey", completedSurvey);
                    res.redirect('/surveys');
                }
            });

        }
    })
}