const connect_db = require('../models/connect_db')

exports.get_component = function(coId,ss_id,callback){
    var sql = "SELECT gs_component_type.cpt_name,cpi_name,ssi_cpi_id,cpi_score,cpi_per,ssi_real_score "+
                "FROM gs_student_score "+
                "LEFT JOIN gs_student_score_item ON ss_id = ssi_ss_id "+
                "LEFT JOIN gs_component_item ON gs_student_score_item.ssi_cpi_id = gs_component_item.cpi_id "+
                "LEFT JOIN gs_component_type ON gs_component_item.cpi_cpt_id = gs_component_type.cpt_id "+
                "WHERE ss_id ="+ss_id+" AND ss_coId ="+coId+" "+
                "ORDER BY ssi_cpi_id"
    connect_db.db.query(sql, function(err,result){
        if(err) throw err
        console.log(result)
        return callback(result)
    })
}
exports.get_criteria = function(coId,callback){
    var sql = "SELECT cti_name,cti_max_score,cti_min_score "+
              "FROM gs_student_score "+
              "LEFT JOIN gs_course_criteria ON gs_student_score.ss_cc_id = gs_course_criteria.cc_id "+
              "LEFT JOIN gs_criteria ON gs_course_criteria.cc_ct_id = gs_criteria.ct_id "+
              "LEFT JOIN gs_criteria_item ON gs_criteria.ct_id = gs_criteria_item.cti_ct_id "+
              "WHERE ss_coId ="+coId+" "+ 
                "GROUP BY cti_name"
    connect_db.db.query(sql, function(err,result){
        if(err) throw err
        return callback(result)
    })
}
exports.update_Sumscore = function(ss_id,ss_score,ss_grade,callback){
    var sql = "UPDATE 	gs_student_score "+
               "SET ss_score ="+ss_score+" ,"+	
                        "ss_grade ="+ss_grade+" "+
                        "WHERE ss_id = "+ss_id+" "
    connect_db.db.query(sql, function(err,result){
        if(err) throw err
        console.log(result)
        return callback(result)
    })
}
