const mongoose = require('mongoose');
const Joi = require('joi');


const Register = mongoose.model('Register', new mongoose.Schema({
    name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50
    },
    email:{
        type:String,
        required:true,
        minlength:5,
        maxlength:50,
        unique:true  
    },
    password:{
        type:String,
        required:true,
        minlength:5,
        maxlength:250,
    },
    phone:{
        type:Number,
        required:true,
        validate:{
            validator: function(ph){
                return ph.length =10;
            },
            message:"Phone must contain 10 digits"
        }
    },
    role:{
        type: String,
        enum: ['Admin','User'],
    },
   isAdmin:Boolean
}));


function validateRegister(register){
    const schema =Joi.object({
        name:Joi.string().min(5).max(50).required().trim(),
        email:Joi.string().min(5).max(50).required().email(),
        password:Joi.string().min(5).max(50).required(),
        phone:Joi.number().min(10).required(),
        role:Joi.string()
    });

    return schema.validate(register);
}

module.exports = {Register,validateRegister};