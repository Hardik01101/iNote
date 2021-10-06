const mongoose=require('mongoose');
const mongoURI="mongodb://localhost:27017/inote?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"

const connecttomongo=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Connected to Mongo");
    })
}

module.exports=connecttomongo;