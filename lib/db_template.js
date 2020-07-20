mysql = require('mysql');

var db = mysql.createConnection({
    host: '',
    password: '',
    user: '',
    database: '',
    multipleStatements: true
})

module.exports = db;