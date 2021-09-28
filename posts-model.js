const mongoose = require('mongoose')
const Joi=require("joi")

const Post = mongoose.model('Post', new mongoose.Schema({
    title:{
        type:String,
        required:true,
        minLength:5,
        maxlength:50
    },
    content:{
        type:String,
        required:true,
        minLength:5,
        maxlength:1000
    },
    author:{
        type:String,
        required:true,
        minLength:5,
        maxlength:50
    },
    imageURL:{
        type:String,
        minLength:5,
        maxlength:1000
    },
    date:{
        type:Date,
    }
}));


function validatePost(post){
    const schema = Joi.object({
        title:Joi.string().min(5).max(50).required(),
        content:Joi.string().min(5).max(1000).required(),
        author:Joi.string().min(5).max(50).required(),
        imageURL:Joi.string().min(5).max(1000),
        date:Joi.date()
    });

    return schema.validate(post);
   
}
module.exports = {Post,validatePost};