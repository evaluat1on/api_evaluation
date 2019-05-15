const connect_db = require('../models/connect_db')

exports.getAll = function(callback){
    var sql = "SELECT * FROM rg_RealStudyPlan"
    connect_db.db.query(sql, function(err,result){
        if(err) throw err
        console.log(result)
        return callback(result)
    })
}
exports.get_year = function(callback){
    var sql = "SELECT rspAdY FROM `rg_RealStudyPlan` GROUP BY rspAdY DESC"
    connect_db.db.query(sql, function(err,result){
        if(err) throw err
        console.log(result)
        return callback(err,result)
    })
}
exports.get_term = function(year_number,callback){
    var sql = "SELECT rspTmId FROM `rg_RealStudyPlan` WHERE rspAdY = "+year_number+" GROUP BY rspTmId ASC"
    connect_db.db.query(sql, function(err,result){
        if(err) throw err
        console.log(result)
        
        return callback(result)
    })
}
exports.get_studentYear = function(term_number,callback){
    var sql = "SELECT rspSyId "+
                "FROM `rg_RealStudyPlan` "+
                "WHERE rspTmId  ="+term_number+" "+
                 "GROUP BY rspSyId ASC"
    connect_db.db.query(sql, function(err,result){
        if(err) throw err
        console.log(result)
        return callback(result)
    })
}
exports.get_cur = function(study_year,callback){
    var sql = "SELECT rg_Curriculum.curId,rg_Curriculum.curName "+
               "FROM `rg_RealStudyPlan` "+
                "LEFT JOIN rg_Curriculum ON rspCurId = rg_Curriculum.curId "+
                "WHERE rspSyId = "+study_year+" "+
                "GROUP BY rg_Curriculum.curName"
    connect_db.db.query(sql, function(err,result){
        if(err) throw err
        console.log(result)
        return callback(result)
    })
}