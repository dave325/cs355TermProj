const mysql = require('mysql');
const db = mysql.createConnection({
    host:process.env.host,
    user: 'process.env.user',
    password: 'process.env.password',
    database: 'process.env.db'
});
module.exports = db;
