const connect_db = require('../models/connect_db')

exports.get_table_subject = function(year_number,term_number,study_year,curId,callback){
    var sql = "SELECT crsCode,crsName,sgId,COUNT(rg_StudyGroupStudent.sgsStdId) as sum , coId "+
                "FROM rg_CourseOpen "+ 
                "LEFT JOIN rg_Course ON rg_CourseOpen.coCrsId = rg_Course.crsId "+
                "LEFT JOIN rg_StudyGroup ON rg_CourseOpen.coSection = rg_StudyGroup.sgId "+
                "LEFT JOIN rg_StudyGroupStudent ON rg_StudyGroup.sgId = rg_StudyGroupStudent.sgsSgId "+
                "WHERE coAcY = "+year_number+" AND coSyId ="+study_year+" AND coTmId ="+term_number+" AND coCurId="+curId+" AND coPrsId = 1 "+
                "GROUP BY coCrsId,sgId"
    connect_db.db.query(sql, function(err,result){
        if(err) throw err
        console.log(result)
        return callback(result)
    })
}
exports.get_all = function(callback){
    var sql = "SELECT crsCode,crsName " +
                "FROM rg_CourseOpen "+ 
                "LEFT JOIN rg_Course ON rg_CourseOpen.coCrsId = rg_Course.crsId "
    connect_db.db.query(sql, function(err,result){
        if(err) throw err
        console.log(result)
        return callback(result)
    })
}
