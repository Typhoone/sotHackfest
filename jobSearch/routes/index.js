var express = require('express');
var router = express.Router();




/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('layout', { title: 'Express' });
});

//return job information related to category:category_id in every citys
router.get('/search/:category_id', function (req, res, next) {
  res.render('index', {data: data});
});


module.exports = router;
