var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const StudentModel = require('../models/student.model');

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});

router.get('/add',function (req,res){
    let newStudent = new StudentModel({
        studentId:101,
        firstName:'Kiran',
        lastName:'Chopra',
        age:21,
        dob:'1990-12-11',
        department:'CSE'
    })
    newStudent.save(function(err,newStudent){
        if(err){
            res.send(err)
        }else{
            res.send({status:200,message:"Student Added Successfully",obj:newStudent})
        }
    });
})

router.get('/allstudents',function (req,res){
    StudentModel.find(function (err,response){
        if(err){
            res.send(err)
        }else{
            res.send({status:200,num_rows:response.length,allstud:response})
        }
    })
})

router.get('/searchbydept',function (req,res,next){
    const department1 = req.query.department;
    StudentModel.find({department:department1},function (err,response){
        if(err){
            res.send(err)
        }else{
            res.send({status:200,num_rows:response.length,result:response});
        }
    })
})

router.get('/searchbyID',function (req,res,next){
    const idQuery = req.query.id;
    StudentModel.findById(idQuery,function (err,response){
        if(err){
            res.send(err)
        }else{
            res.send({status:200,num_rows:response.length,result:response});
        }
    })
})

// update student data as department=Electronics where age is 23
router.put('/update',function (req,res,next){
    const dept = req.query.department;
    StudentModel.updateMany({age:23},{department:dept},function (err,response){
        if(err){
            res.send(err)
        }else{
            res.send({status:200,num_rows:response.length,result:response});
        }
    })
})

// update student data as age=25 where id=_id
router.put('/updatebyID',function (req,res,next){
    const id = req.query.id;
    const age1 = req.query.age;
    StudentModel.findByIdAndUpdate(id,{age:age1},function (err,response){
        if(err){
            res.send(err)
        }else{
            res.send({status:200,num_rows:response.length,result:response});
        }
    })
})

// delete student data by id=_id
router.delete('/deletebyID',function (req,res,next){
    const id = req.query.id;
    StudentModel.findByIdAndDelete(id,function (err,response){
        if(err){
            res.send(err)
        }else{
            res.send({status:200,num_rows:response.length,result:response});
        }
    })
})

module.exports = router;
