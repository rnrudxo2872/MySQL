mysql = require('mysql');

var resort_db = mysql.createConnection({
    host: 'localhost',
    password: 'koos123456',
    user: 'nodejs',
    database: 'opentutorials',
    multipleStatements: true
})

module.exports = resort_db;