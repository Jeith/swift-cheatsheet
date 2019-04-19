var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/:countryName', function(req, res, next) {
    var renderData = { countryName: req.params.countryName };
    res.render('country-info', renderData);
});

module.exports = router;