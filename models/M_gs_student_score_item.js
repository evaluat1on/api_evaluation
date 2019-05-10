const connect_db = require('../models/connect_db')

exports.update_score = function(ss_id,cpi_id,ssi_real_score,ssi_score,callback){
    var sql = "UPDATE 	gs_student_score_item "+
               "SET ssi_real_score ="+ssi_real_score+" ,"+	
                        "ssi_score ="+ssi_score+" "+
                        "WHERE ssi_ss_id = "+ss_id+" AND ssi_cpi_id="+cpi_id+""
    connect_db.db.query(sql, function(err,result){
        if(err) throw err
        console.log(result)
        return callback(result)
    })
}
exports.get_sum_score_personal = function(ss_id,callback){
    var sql = "SELECT ssi_ss_id,SUM(ssi_score) AS sumscore "+
              "FROM gs_student_score_item "+
              "WHERE ssi_ss_id = "+ss_id+" "
    connect_db.db.query(sql, function(err,result){
        if(err) throw err
        console.log(result)
        return callback(result)
    })
}