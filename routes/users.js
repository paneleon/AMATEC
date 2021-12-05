var express = require('express');
const { User } = require('../models/user');
var router = express.Router();
let userController  = require('../controllers/users');

/* GET users listing. */
// router.get('/', (req, res, next) => {
//   res.send('respond with a resource');
  
// });

router.get('/', userController.displayUsers);


module.exports = router;
