let mongoose = require('mongoose');

let completedSurveyModel = mongoose.Schema({
    surveyId: mongoose.Schema.Types.ObjectId,
    surveyName: String,
    completedBy: mongoose.Schema.Types.ObjectId,
    completedByName: String,
    answers: Array
},
{
    collection: 'completedSurveys'
});

module.exports = mongoose.model('CompletedSurvey', completedSurveyModel);