const e = require('connect-flash');
let express = require('express');
let router = express.Router;
let mongoose = require('mongoose');
let passport = require('passport');
let passportLocal = require('passport-local');

let db = require('../config/db');
let Survey = require('../models/survey');
const { User } = require('../models/user');

// Landing Page ('/' or '/home')
module.exports.displayHomePage = (req, res, next) => {
    res.render('templates/home', { title: 'Home', displayName: req.user ? req.user.displayName: ''});
}

// Contact us Page 
module.exports.displayContactPage = (req, res, next) => {
    res.render('templates/contact', { title: 'Contact', displayName: req.user ? req.user.displayName: '' });
}

// Coming Soon Page (Placeholder)
module.exports.displayComingSoon = (req, res, next) => {
    res.render('templates/coming-soon', {title: 'Coming Soon', displayName: req.user ? req.user.displayName: ''} );
}


module.exports.displayLoginPage = (req, res, next) => {
    res.render('auth/login', {title: "", messages: "", displayName: req.user ? req.user.displayName: ''});
}

module.exports.loginUser = async (req, res, next) => {
    let username = req.body.username;
    let password = req.body.password;

    passport.authenticate('local', (error, user) => {
        if (error) {
            console.log("Server error occurred ", error);
            return next(error);
        }

        if(!user){
            console.log("User login error");
            req.flash('loginMessage', 'Authentication Error');
            return res.redirect('/login');
        }
        req.login(user, (error) => {
            if (error){
                console.log("Server error occurred ", error);
            }
            
            console.log("Successfully authenticated!");

            return res.redirect('/surveys/');
        });
    })
    (req, res, next);
}

module.exports.displayRegisterPage = (req, res, next) => {
    res.render('auth/register', {title: ""});
}

module.exports.registerUser = (req, res, next) => {
    
    let newUser = new User({
        username: req.body.username,
        email: req.body.email,
        displayName: req.body.displayName
    })

    User.findOne({username: newUser.username})
    .then(user => {
        if (user !== null){
            req.flash('registerMessage', "User already exists!");
            res.redirect('/register')
        }
    })
    
    User.register(newUser, req.body.password, (error) => {
        if (error) {
            console.log("Error occurred: ", error);
            if (error.name == "UserExistsError") {}
        } else {
            return passport.authenticate('local')(req, res, () => {
                res.redirect('/');
            })
        }
    })

    
}

module.exports.logoutUser = (req, res, next) => {
    if (!req.isAuthenticated()){
        return res.redirect('/login');
    }
    req.logout();
    res.redirect('/');
}