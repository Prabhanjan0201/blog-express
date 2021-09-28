const bcrypt = require('bcrypt')
const lodash = require ('lodash');
const express = require('express');
const router = express.Router();

const {Register, validateRegister } = require('../model/register-model');

router.post ('/',async (req,res)=>{
    const result = validateRegister(req.body);
    if (result.error){
        res.status(400).send(result.error.details[0].message)
    }
    let register = await Register.findOne({email:req.body.email});
    if (register) return res.status(400).send('Sorry!! The email already exists') 

    register = new Register(lodash.pick(req.body,["name","email","password","phone","role"]));
        
    const salt = await bcrypt.genSalt(10);
    register.password = await bcrypt.hash(register.password,salt);
    register = await register.save();

    res.send(lodash.pick(register,["name","email","phone","role"]))
});

 module.exports = router;