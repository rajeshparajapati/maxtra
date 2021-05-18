const mongoose = require("mongoose");

exports.dbConnetion = async()=>{
    try{
       const con =  await mongoose.connect(process.env.DB,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
        });
        console.log('connection stablised')
    }catch{
        process.exit();
    }   
}

