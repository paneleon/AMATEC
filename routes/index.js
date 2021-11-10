const express = require('express');
const router = express.Router();

const indexController = require('../controllers/index');

/* GET Home page. */
router.get('/', indexController.displayHomePage);
router.get('/home', indexController.displayHomePage);

/* GET Coming Soon Page. */
router.get('/coming-soon', indexController.displayComingSoon);

/* GET Contact Us Page. */
/*
  Right now this redirects to "coming soon page" in controller
  Will need to change later!
 */
router.get('/contact', indexController.displayContactPage);

module.exports = router;
