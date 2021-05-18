const userModel = require("../model/user_model");
const constant = require('../constant/constant');
const bcrypt = require('bcrypt');

const registration = async (req,res)=>{  
   console.log(req.file);
   let contact  =  await userModel.findOne({contact:req.body.contact})

   if(contact){
      return res.send({status:constant.ALREADY_EXIST,message:constant.CONTACT_EXIST})
   }
    userModel.findOne({email:req.body.email}).then( async user=>{         
       if(!user){
         let  password = await bcrypt.hashSync(req.body.password,constant.SALT);
         userRegistration = {
            name:req.body.name,           
            email:req.body.email,
            password:password,
            contact:req.body.contact,
            image:req.file.destination+req.file.filename            
         }
         new userModel(userRegistration).save().then(user=>{
            req.session.user = user;            
            res.send({status:constant.SUCCESS_CODE,message:constant.ADDED_SUCCESS})
         }).catch(err=>{
            return res.send({status:constant.DATABASE,message:constant.DATABASE_ERROR});
         })
       }else {
         return res.send({status:constant.ALREADY_EXIST,message:constant.EMAIL_EXIST})
       }
    }).catch(err=>{
      return res.send({status:constant.DATABASE,message:err.message || constant.DATABASE})
    })
}

const login = (req,res)=>{
   console.log(req.body);
   userModel.findOne({$or:[{email:req.body.logintype},{contact:req.body.logintype}]}).then( async user=>{     
      if(!user){
         return res.send({status:constant.NOT_FOUND,message:constant.USER_NOT_FOUND})
      }else{        
          passwordCompare = await  bcrypt.compareSync(req.body.password,user.password);
          if(passwordCompare){
             delete user.password;
            req.session.user = user;
            res.send({status:constant.SUCCESS_CODE,message:constant.LOGIN_SUCCESS})           
          }else{
            return res.send({status:constant.NOT_FOUND,message:constant.INVALID_USER_MSG})
          }         
      }
   }).catch(err=>{
      return res.send({status:constant.DATABASE,message:err.message || constant.DATABASE_ERROR});
   })
}

module.exports = {
   login,
   registration

}


