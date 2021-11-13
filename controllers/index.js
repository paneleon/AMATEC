let express = require('express');
let router = express.Router;
let mongoose = require('mongoose');

let db = require('../config/db');
let Survey = require('../models/survey');

// Landing Page ('/' or '/home')
module.exports.displayHomePage = (req, res, next) => {
    res.render('templates/home', { title: 'Home' });
}

// Contact us Page 
module.exports.displayContactPage = (req, res, next) => {
    res.render('templates/coming-soon', { title: 'Contact' });
}

// Coming Soon Page (Placeholder)
module.exports.displayComingSoon = (req, res, next) => {
    res.render('templates/coming-soon', {title: 'Coming Soon'} )
}


