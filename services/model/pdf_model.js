const mongoose = require("mongoose");

let PdfModel = new mongoose.Schema({
    pdf:{
        type:String,
        required:true
    },
    user_id:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    }
   
});

module.exports = mongoose.model('pdf',PdfModel);