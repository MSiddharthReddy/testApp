var express = require('express');
var getLocations = require('./getLocations');
var setLocations = require('./setLocations');
var router = express.Router();

/* GET home page. */
router.get('/getLocations', getLocations );
router.get('/setLocations', setLocations );
module.exports = router;