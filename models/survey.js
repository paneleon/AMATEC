let mongoose = require('mongoose');

// create a model class
let surveyModel = mongoose.Schema({
    // id: Number,
    name: String,
    description: String,    
},
{
    collection: "surveys"
});

module.exports = mongoose.model('Survey', surveyModel);