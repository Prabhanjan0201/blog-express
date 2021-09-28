const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const lodash = require('lodash');
const {Register} = require('../model/register-model');
const express = require("express");
const router = express.Router();
const Joi = require("joi");

router.post("/", async (req, res) => {
    const result = validateLog(req.body);
  
    if (result.error) {
      res.status(400).send(result.error.details[0].message);
    }
  
    let register = await Register.findOne({email: req.body.email });
    if (!register)return res.status(400).send('Invalid email or password')

    const validPassword = await bcrypt.compare(req.body.password,register.password);
    if (!validPassword) return res.status(400).send('Invalid email or paaword');
    
    const token = jwt.sign({_id: register._id},'secretWeapon')
    res.send(token);
  });

  function validateLog(register){
    const schema =Joi.object({
        email:Joi.string().min(5).max(50).required().email(),
        password:Joi.string().min(5).max(50).required() 
    });
 return schema.validate(register);
}



 module.exports = router;

