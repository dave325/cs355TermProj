const mysql = require('mysql');
const db = mysql.createConnection({
    host: 'us-cdbr-iron-east-02.cleardb.net',
    user: 'be546f8c4a4ea7',
    password: '744c4f69',
    database: 'heroku_376e5d0b653c734'
});
module.exports = db;