const connect_db = require('../models/connect_db')

exports.get_ct_name = function(callback){
    var sql = "SELECT ct_name FROM gs_criteria"
    connect_db.db.query(sql, function(err,result){
        if(err) throw err
        console.log(result)
        return callback(result)
    })
}