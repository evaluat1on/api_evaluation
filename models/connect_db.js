const config = require('../config.js')
var mysql = require('mysql');
var db = mysql.createConnection(
    config.database_CE
);

db.connect((err) =>{
    if(err) throw err
        console.log("Connected school_accountdb!! ");
})
exports.db = db;