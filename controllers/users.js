// Users controller for testing purposes and future use

let express = require('express');

let db = require('../config/db');
let Survey = require('../models/survey');
const { User } = require('../models/user');


module.exports.displayUsers = (req, res, next) => {

    User.find((error, users) => {
        if (error){
            return console.log(error);
        } else {
            return res.status(200).send(users); 
        }
    })
}

