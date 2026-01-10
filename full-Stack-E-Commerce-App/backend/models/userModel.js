const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
     name : String,
     email : {
        type : String,
        unique : true,
        required : true,
     },
     password : String,
     ProfilePic : String,
     role : String,
    
},
{
    timestaps : true 
})


const userModel = mongoose.model('user', userSchema) 


module.exports = userModel