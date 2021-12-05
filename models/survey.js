let mongoose = require('mongoose');

// create a model class
let surveyModel = mongoose.Schema({
    name: String,
    description: String,
    expirationDate: Date,
    createdBy: mongoose.Schema.Types.ObjectId,    
    numberOfQuestions: Number,
    numberOfOptions: Number,
    surveyQuestions: Array,
},
{
    collection: "surveys"
});

module.exports = mongoose.model('Survey', surveyModel);