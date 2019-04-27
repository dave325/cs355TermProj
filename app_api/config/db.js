var mongoose = require('mongoose');
const url = "mongodb://oweyaa:password1@ds129821.mlab.com:29821/oweyaa";
mongoose.connect(url, {useNewUrlParser:true});
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
// Close mongoose connection, passing through an anonymous function to run when closed
var gracefulShutdown = function (msg, callback) {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnected through ' + msg);
        callback();
    });
};
require('../models/candidateuser');
require('../models/companyuser');
require('../models/user.js');
module.exports = mongoose.connection;