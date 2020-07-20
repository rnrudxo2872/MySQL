mysql = require('mysql');

var db = mysql.createConnection({
    host: 'localhost',
    password: 'koos123456',
    user: 'nodejs',
    database: 'opentutorials',
    multipleStatements: true
})

module.exports = db;