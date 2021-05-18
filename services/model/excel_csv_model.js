const mongoose = require("mongoose");

let excelCsvModel = new mongoose.Schema({
    message:{
        type:String,
        required:true
    },
    user_id:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    }
   
});

module.exports = mongoose.model('excelcsv',excelCsvModel);