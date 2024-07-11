var express = require('express');
var router = express.Router();


router.get('/', home);


function home(req, res, next) {
  res.render('index', { title: 'Express' });
}

module.exports = router;
