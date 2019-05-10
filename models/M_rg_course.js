const connect_db = require('../models/connect_db')

exports.get_subject_grade = function(year_number,term_number,study_year,curId,grade,callback){
    var sql = "SELECT coId,crsCode,crsName,COUNT(ss_grade) AS number_grade "+
              "FROM rg_Student "+
              "LEFT JOIN gs_student_score ON ss_stdId = stdId "+
              "LEFT JOIN rg_CourseOpen ON coId = ss_coId "+
              "LEFT JOIN rg_StudyGroup ON coSection = sgId "+
              "LEFT JOIN rg_RealStudyPlan ON rspId = coRspId "+
              "LEFT JOIN rg_Curriculum ON curId = rspCurId "+
              "LEFT JOIN .rg_Course ON rg_CourseOpen.coCrsId = rg_Course.crsId "+
              "WHERE coSyId ="+study_year+" AND coAcY ="+year_number+" AND coTmId ="+term_number+" AND curId ="+curId+" AND coPrsId =1 AND ss_grade="+grade+" "+
              "GROUP BY coId"
    connect_db.db.query(sql, function(err,result){
        if(err) throw err
        console.log(result)
        return callback(result)
    })
}
exports.get_student_onsubject = function(year_number,term_number,study_year,curId,coId,grade,callback){
    var sql = "SELECT stdCode, pfName, stdName, stdSurname, ss_grade "+
                "FROM rg_Student "+
                "LEFT JOIN rg_Prefix ON pfId = stdPfId "+
                "LEFT JOIN gs_student_score ON ss_stdId = stdId "+
                "LEFT JOIN rg_CourseOpen ON coId = ss_coId "+
                "LEFT JOIN rg_RealStudyPlan ON rspId = coRspId "+
                "LEFT JOIN rg_Curriculum ON curId = rspCurId "+
                "LEFT JOIN rg_Course ON rg_CourseOpen.coCrsId = rg_Course.crsId "+
                "WHERE coSyId ="+study_year+" AND coAcY ="+year_number+" AND coTmId ="+term_number+" AND curId ="+curId+" AND coId ="+coId+" AND ss_grade ="+grade+" AND coPrsId = 1"
    connect_db.db.query(sql, function(err,result){
        if(err) throw err
        console.log(result)
        return callback(result)
    })
}