const express = require('express');
const router = express.Router();

const indexController = require('../controllers/index');

/* GET Home page. */
router.get('/', indexController.displayHomePage);
router.get('/home', indexController.displayHomePage);

/* GET Coming Soon Page. */
router.get('/coming-soon', indexController.displayComingSoon);

/* GET Contact Us Page. */
router.get('/contact', indexController.displayContactPage);

router.get('/login', indexController.displayLoginPage);

router.post('/login', indexController.loginUser);

router.get('/register', indexController.displayRegisterPage);

router.post('/register', indexController.registerUser);

// router.post('/register', indexController);

router.get('/logout', indexController.logoutUser);

module.exports = router;
