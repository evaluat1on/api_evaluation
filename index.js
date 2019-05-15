const express = require('express')
const app = express()
const port = 1235
const bodyParser = require('body-parser');
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({
    		extended: true
	}));
const CE_model = require('./models/CE_model')
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');
  
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  
    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
  
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
  
    // Pass to next layer of middleware
    next();
  });
/*
    * get_year
    * รับค่าปีการศึกษา
    * input -
    * output -
    * @author Nontakorn and Santisuk
    * @Create Date 2018-12-22
    */
app.get('/get_year', (req, res) => {
    CE_model.M_rg_realstudyplan.get_year(function(err,result){
        console.log(err,result)
        res.send(result)
    })
})
app.get('/get_all', (req, res) => {
    CE_model.M_rg_CourseOpen.get_all(function(result){
        res.send(result)
    })
})
    /*
    * get_term
    * รับค่าปีการศึกษา
    * input -ß
    * output -
    * @author Nontakorn and Santisuk
    * @Create Date 2018-12-22
    */
app.post('/get_term', (req, res) => {
    CE_model.M_rg_realstudyplan.get_term(req.body.year_number,function(result){
        console.log(result)
        res.send(result)

    })
})
    /*
    * get_studentYear
    * รับค่าปีการศึกษา
    * input -
    * output -
    * @author Nontakorn and Santisuk
    * @Create Date 2018-12-22
    */
app.post('/get_studentYear', (req, res) => {
    CE_model.M_rg_realstudyplan.get_studentYear(req.body.term_number,function(result){
        console.log(result)
        res.send(result)
    })
})
    /*
    * get_cur
    * รับค่าปีการศึกษา
    * input -
    * output -
    * @author Nontakorn and Santisuk
    * @Create Date 2018-12-22
    */
app.post('/get_cur', (req, res) => {
    CE_model.M_rg_realstudyplan.get_cur(req.body.study_year,function(result){
        console.log(result)
        res.send(result)
    })
})

   /*
    * get_score_student_by_grade
    * //ดูรายบุคคล
    * input -
    * output -
    * @author sutima and natthida
    * @Create Date 2018-12-22
    */
app.post('/get_score_student_by_grade', (req, res) => {
    CE_model.M_rg_student.get_score_student_by_grade(req.body.year_number,req.body.term_number,req.body.study_year,req.body.curId,req.body.grade,function(result){
        console.log(result)
        res.send(result)
    })
})
   /*
    * get_score_student_by_grade
    * //ดูเกรดที่นักเรียนคนนั้นได้
    * input -
    * output -
    * @author sutima and natthida
    * @Create Date 2018-12-22
    */
app.post('/get_subject_by_studentid', (req, res) => {
    CE_model.M_rg_student.get_subject_by_studentid(req.body.year_number,req.body.term_number,req.body.study_year,req.body.curId,req.body.grade,req.body.stdId,function(result){
        console.log(result)
        res.send(result)
    })
})

  /*
    * get_subject_grade
    * //ดูเกรดที่รายวิชา
    * input -
    * output -
    * @author sasakarn and sakuna
    * @Create Date 2018-12-22
    */
app.post('/get_subject_grade', (req, res) => {
    CE_model.M_rg_course.get_subject_grade(req.body.year_number,req.body.term_number,req.body.study_year,req.body.curId,req.body.grade,function(result){
        console.log(result)
        res.send(result)
    })
})
  /*
    * get_student_onsubject
    * ดูเกรดรายวิชาและด้านในเป็นชื่อนักเรียน
    * input -
    * output -
    * @author sasakarn and sakuna
    * @Create Date 2018-12-22
    */
app.post('/get_student_onsubject', (req, res) => {
    CE_model.M_rg_course.get_student_onsubject(req.body.year_number,req.body.term_number,req.body.study_year,req.body.curId,req.body.coId,req.body.grade,function(result){
        console.log(result)
        res.send(result)
    })
})


  /*
    * get_table_subject
    * ดูรายวิชาที่สอน
    * input -
    * output -
    * @author satthabut and kittaporn
    * @Create Date 2018-12-22
    */
app.post('/get_table_subject', (req, res) => {
    CE_model.M_rg_CourseOpen.get_table_subject(req.body.year_number,req.body.term_number,req.body.study_year,req.body.curId,function(result){
        console.log(result)
        res.send(result)
    })
})
/*
    * get_student_grade_by_coId
    * แสดงรายชื่อ และ เกรดที่ได้ในรายวิชานั้น
    * input -
    * output -
    * @author satthabut and kittaporn
    * @Create Date 2018-12-22
    */
app.post('/get_student_grade_by_coId', (req, res) => {
    CE_model.M_rg_student.get_student_grade_by_coId(req.body.year_number,req.body.term_number,req.body.study_year,req.body.curId,req.body.coId,function(result){
        console.log(result)
        res.send(result)
    })
})

/*
    * get_data_chart
    * แสดงข้อมูลกราฟ
    * input -
    * output -
    * @author peeradon and rapeepat
    * @Create Date 2018-12-22
    */
app.post('/get_data_chart', (req, res) => {
    CE_model.M_rg_student.get_data_chart(req.body.year_number,req.body.term_number,req.body.study_year,req.body.curId,req.body.coId,function(result){
        console.log(result)
        res.send(result)
    })
})
/*
    * get_student_all_score
    * แสดงข้อมูลกราฟ
    * input -
    * output -
    * @author peeradon and rapeepat
    * @Create Date 2018-12-22
    */
app.post('/get_student_all_score', (req, res) => {
    CE_model.M_rg_student.get_student_all_score(req.body.year_number,req.body.term_number,req.body.study_year,req.body.curId,req.body.coId,function(result){
        console.log(result)
        res.send(result)
    })
})


/*
    * get_component
    * //แสดงที่กรอกคะแนน
    * input -
    * output -
    * @author satthabut
    * @Create Date 2018-12-22
    */
app.post('/get_component', (req, res) => {
    CE_model.M_gs_student_score.get_component(req.body.coId,req.body.ss_id,function(result){
        console.log(result)
        res.send(result)
    })
})

/*
    * get_criteria
    * ส่งเกณฑ์รายวิชา
    * input -
    * output -
    * @author satthabut
    * @Create Date 2018-12-22
    */
app.post('/get_criteria', (req, res) => {
    CE_model.M_gs_student_score.get_criteria(req.body.coId,function(result){
        console.log(result)
        res.send(result)
    })
})

/*
    * update_score
    * อัพเดตคะแนนองค์ประกอบ
    * input -
    * output -
    * @author satthabut
    * @Create Date 2018-12-22
    */
app.put('/update_score', (req, res) => {
    CE_model.M_gs_student_score_item.update_score(req.body.ss_id,req.body.cpi_id,req.body.ssi_real_score,req.body.ssi_score,function(result){
        console.log(result)
        res.send(result)
    })
})

/*
    * get_sum_score_personal
    * รับค่าคะแนนรวม จาก องค์ประกอบย่อยทั้งหมด
    * input -
    * output -
    * @author satthabut
    * @Create Date 2018-12-22
    */
app.post('/get_sum_score_personal', (req, res) => {
    CE_model.M_gs_student_score_item.get_sum_score_personal(req.body.ss_id,function(result){
        console.log(result)
        res.send(result)
    })
})

/*
    * update_Sumscore
    * อัพเดตคะแนนรวม
    * input -
    * output -
    * @author satthabut
    * @Create Date 2018-12-22
    */
app.post('/update_Sumscore', (req, res) => {
    CE_model.M_gs_student_score.update_Sumscore(req.body.ss_id,req.body.ss_grade,function(result){
        console.log(result)
        res.send(result)
    })
})
app.post('/get_student_list', (req, res) => {
    CE_model.M_gs_student_score.get_student_list(req.body.coId,function(result){
        console.log(result)
        res.send(result)
    })
})
app.get('/get_student_all_year', (req, res) => {
    CE_model.M_rg_student.get_student_all_year(function(result){
        res.send(result)
    })
})
app.get('/get_teacher', (req, res) => {
    CE_model.M_rg_student.get_teacher(function(result){
        res.send(result)
    })
})
app.get('/get_count_coid', (req, res) => {
    CE_model.M_rg_CourseOpen.get_count_coid(function(result){
        res.send(result)
    })
})









app.get('/users',(req, res) => {
    let json_data = {}
    json_data.push({"name":"hello world"})
    res.send(JSON.stringify(json_data));
})
app.post('/user',(req, res)=>{
    // same result with $this->input->post('username')
    res.send('post /user :' + req.body.username)
})
app.listen(port, () => console.log(`Example app listening on port ${port}!`))