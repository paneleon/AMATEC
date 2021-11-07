var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Home' });
});

router.get('/home', (req, res, next) => {
  res.render('index', { title: 'Home' });
});

router.get('/surveys', (req, res, next) => {
  res.render('index', { title: 'Surveys' });
});

router.get('/coming-soon', (req, res, next) => {
  res.render('index', {title: 'Coming Soon'})
});

router.get('/contact', (req, res, next) => {
  res.render('index', { title: 'Contact' });
});

module.exports = router;

// comment