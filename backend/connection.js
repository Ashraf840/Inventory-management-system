const mysql = require('mysql2');
const config = require('./config.json');

var connection = mysql.createConnection({
    port: config.DB_PORT,
    host: config.DB_HOST,
    user: config.DB_USERNAME,
    password: config.DB_PASSWORD,
    database: config.DB_NAME,
});

connection.connect((err) => {
    if (!err) {
        console.log("DB Connected!");
    } else {
        console.log(err);
    }
});

module.exports = connection;