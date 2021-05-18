const express = require("express");
const route = express.Router();
const renderService = require('../service/render');

const loginCheck = require("../middleware/utility")




route.get('/dashboard',loginCheck.loginChecker,renderService.home);

route.get('/registration',renderService.registration);



route.get('/',loginCheck.existLogin,renderService.login)


route.get('/pdf-list',loginCheck.loginChecker,renderService.pfdList)

route.get('/csv-excel-list',loginCheck.loginChecker,renderService.csvExcelList)






 

module.exports = route;