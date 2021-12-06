let mongoose = require('mongoose');

let completedSurveyModel = mongoose.Schema({
    surveyId: mongoose.Schema.Types.ObjectId,
    completedBy: mongoose.Schema.Types.ObjectId,
    answers: Array
},
{
    collection: 'completedSurveys'
});

module.exports = mongoose.model('CompletedSurvey', completedSurveyModel);