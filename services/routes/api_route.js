const route = require('express').Router();
const multer  = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    }, filename: function (req, file, cb) {
        fileExtension = file.originalname.split('.')   
        cb(null,fileExtension[0] + '-' +Date.now()+'.'+fileExtension[1])
    }
})
const upload = multer({storage: storage})

const User = require("../controller/users");
const Files = require("../controller/files")

route.post('/login',User.login);
route.post('/registration',upload.single('file'),User.registration);
route.post('/upload-pdf',upload.single('file'),Files.uploadPdf);
route.post('/upload-csv-excel',upload.single('file'),Files.csvExcel);



module.exports = route;



