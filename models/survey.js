let mongoose = require('mongoose');

// create a model class
let surveyModel = mongoose.Schema({
    // id: Number,
    
    title: String,
    description: String,
    expirationDate: Date,
    createdBy: mongoose.Schema.Types.ObjectId,    
    surveyQuestion: [{
        question: String
            }],
},
{
    collection: "surveys"
});

module.exports = mongoose.model('Survey', surveyModel);