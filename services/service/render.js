const PdfModel = require('../model/pdf_model')
const ExcelCsvModel = require('../model/excel_csv_model')
const mongoose = require("mongoose")
exports.home = (req,res)=>{
    res.render('dashboard');
}
exports.registration = (req,res)=>{
    res.render('ragistration')
}
exports.login = (req,res)=>{
    res.render('login')
}
exports.pfdList = async (req,res)=>{  
    
    let result = await PdfModel.find({user_id: mongoose.Types.ObjectId(req.session.user._id)});
    console.log(result);
    res.render('pdf-list',{result:result})
}
exports.csvExcelList = async (req,res)=>{    
    let result = await ExcelCsvModel.find({user_id: mongoose.Types.ObjectId(req.session.user._id)});
    res.render('csv-excel',{result:result})
 }
