const connect_db = require('../models/connect_db')

exports.get_score_student_by_grade = function(year_number,term_number,study_year,curId,grade,callback){
    var sql = "SELECT stdCode,pfName, stdName, stdSurname,COUNT(ss_grade) as number_grade "+
            " FROM rg_Student "+
            "LEFT JOIN rg_Prefix ON pfId = stdPfId "+
            "LEFT JOIN gs_student_score ON ss_stdId = stdId "+
            "LEFT JOIN rg_CourseOpen ON coId = ss_coId "+
            "LEFT JOIN rg_RealStudyPlan ON rspId = coRspId "+
            "LEFT JOIN rg_Curriculum ON curId = rspCurId "+
            "WHERE rspAdY="+year_number+" AND rspSyId="+study_year+" AND rspTmId="+term_number+" AND curId="+curId+" AND coPrsId=1 AND ss_grade="+grade+" "+
            "GROUP BY stdCode"
    connect_db.db.query(sql, function(err,result){
        if(err) throw err
        console.log(result)
        return callback(result)
    })
}
exports.get_subject_by_studentid = function(year_number,term_number,study_year,curId,grade,stdId,callback){
    var sql = "SELECT stdCode,pfName, stdName, stdSurname,crsCode, crsName, ss_grade "+
               " FROM rg_Student "+
               "LEFT JOIN rg_Prefix ON pfId = stdPfId "+
                "LEFT JOIN gs_student_score ON ss_stdId = stdId "+
                "LEFT JOIN rg_CourseOpen ON coId = ss_coId "+
                "LEFT JOIN rg_RealStudyPlan ON rspId = coRspId "+
                "LEFT JOIN rg_Curriculum ON curId = rspCurId "+
                "LEFT JOIN rg_Course on crsId = rspCrsId "+
                "WHERE rspAdY="+year_number+" AND rspSyId="+study_year+" AND rspTmId="+term_number+" AND curId="+curId+" AND coPrsId=1 AND stdCode="+stdId+" AND ss_grade="+grade+""
    connect_db.db.query(sql, function(err,result){
        if(err) throw err
        console.log(result)
        return callback(result)
    })
}
exports.get_student_grade_by_coId = function(year_number,term_number,study_year,curId,coId,callback){
    var sql = "SELECT stdCode,pfName, stdName, stdSurname,ss_grade "+
              "FROM rg_Student "+
              "LEFT JOIN rg_Prefix ON pfId = stdPfId "+
              "LEFT JOIN gs_student_score ON ss_stdId = stdId "+
              "LEFT JOIN rg_CourseOpen ON coId = ss_coId "+
              "LEFT JOIN rg_RealStudyPlan ON rspId = coRspId "+
              "LEFT JOIN rg_Curriculum ON curId = rspCurId "+
              "WHERE rspAdY="+year_number+" AND rspSyId="+study_year+" AND rspTmId="+term_number+" AND curId="+curId+" AND coPrsId=1 AND ss_coId ="+coId+" "+
              "GROUP BY stdCode"
    connect_db.db.query(sql, function(err,result){
        if(err) throw err
        console.log(result)
        return callback(result)
    })
}
exports.get_data_chart = function(year_number,term_number,study_year,curId,coId,callback){
    var sql = "SELECT ss_grade,COUNT(ss_grade) AS numgrade "+
                "FROM rg_Student "+
                "LEFT JOIN gs_student_score ON ss_stdId = stdId "+
                "LEFT JOIN rg_CourseOpen ON coId = ss_coId "+
                "LEFT JOIN rg_RealStudyPlan ON rspId = coRspId "+
                "LEFT JOIN rg_Curriculum ON curId = rspCurId "+
                "WHERE rspAdY="+year_number+" AND rspSyId="+study_year+" AND rspTmId="+term_number+" AND curId="+curId+" AND coPrsId=1 AND ss_coId ="+coId+" "+ 
                "GROUP BY ss_grade"
    connect_db.db.query(sql, function(err,result){
        if(err) throw err
        console.log(result)
        return callback(result)
    })
}
exports.get_student_all_score = function(year_number,term_number,study_year,curId,coId,callback){
    var sql = "SELECT ss_id,stdCode, pfName, stdName, stdSurname,ss_score ,COUNT(ssi_cpi_id) AS allCp ,sum(CASE WHEN ssi_real_score != 0 THEN  1 ELSE 0 END) AS inputd "+
                "FROM rg_Student "+ 
                "LEFT JOIN rg_Prefix ON pfId = stdPfId "+ 
                "LEFT JOIN gs_student_score ON ss_stdId = stdId "+
                "LEFT JOIN rg_CourseOpen ON coId = ss_coId "+
                "LEFT JOIN rg_RealStudyPlan ON rspId = coRspId "+
                "LEFT JOIN rg_Curriculum ON curId = rspCurId "+
                "LEFT JOIN gs_student_score_item ON gs_student_score.ss_id = gs_student_score_item.ssi_ss_id "+
                "WHERE rspAdY="+year_number+" AND rspSyId="+study_year+" AND rspTmId="+term_number+" AND curId="+curId+" AND coPrsId=1 AND ss_coId ="+coId+" "+ 
                "GROUP BY stdCode"
    connect_db.db.query(sql, function(err,result){
        if(err) throw err
        console.log(result)
        return callback(result)
    })
}
