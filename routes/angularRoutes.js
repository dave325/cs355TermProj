var express = require('express');
var router = express.Router();
const path = require('path');
/**
 * Use this to have users reset password
 */

/* GET home page. */
router.get('*',  function(req, res, next) {
  console.log(path.join(__dirname, '../', 'dist/index.html'))
  res.sendFile(path.join(__dirname, '../','dist/index.html'));
});

module.exports = router;