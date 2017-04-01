var express = require('express');
var verify = require('./verifyLocation');
var unVerify = require('./unVerify');
var router = express.Router();

/* GET home page. */
router.get('/verify', verify );
router.get('/unVerify', unVerify );
module.exports = router;