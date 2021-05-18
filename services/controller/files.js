const pdfModel = require("../model/pdf_model");
const excelCsvModel = require("../model/excel_csv_model");
const constant = require('../constant/constant');
const XLSX = require('xlsx');


const uploadPdf  = (req,res)=>{
    data = {
        pdf:req.file.destination+req.file.filename,
        user_id:req.session.user._id
    }
    new pdfModel(data).save().then(result=>{
        return res.send({status:constant.SUCCESS_CODE,message:constant.ADDED_SUCCESS});
    }).catch(err=>{
        return res.send({status:constant.DATABASE,message:constant.DATABASE_ERROR});
    })

}

const csvExcel  = async (req,res)=>{    
    var workbook = XLSX.readFile(req.file.destination+req.file.filename)
    var sheet_name_list = workbook.SheetNames; 
    data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet_name_list[0]]);
    await Promise.all(data.map(async (result,i)=>{
        row = {message:result.message,user_id:req.session.user._id}; 
        await  new excelCsvModel(row).save();        
    }))  
    return res.send({status:constant.SUCCESS_CODE,message:constant.ADDED_SUCCESS});
}




module.exports = {
    uploadPdf,
    csvExcel

}