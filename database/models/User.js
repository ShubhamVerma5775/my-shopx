const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    cpassword:{
        type:String,
        required:true,
    },
    number:{
        type: Number,
        required:true,
        unique:true
    }

})  

const User = mongoose.model("User",userSchema);

module.exports = User;