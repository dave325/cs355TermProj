var express = require('express');
var router = express.Router();
var test = require('../app_api/controllers/index.controller');
router.post('/',test.test);
router.post('/puppet',test.puppetTest);
router.post('/find',test.findInfo);
router.post('/search', test.query);
module.exports = router;
