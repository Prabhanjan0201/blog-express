const mongoose = require ('mongoose');
const Joi =  require('joi');
const express = require('express');
const lodash = require ('lodash');
const router = express.Router();
const jwt = require('jsonwebtoken')
const posts = require('./routes/posts');
const register = require('./routes/register');
const login = require('./routes/login');

const app = express();
require('dotenv').config();

mongoose.connect('mongodb://localhost/testblog')
    .then(()=>console.log('Connected to testblog....'))
    .catch(err => console.log('Connection not possible'))

app.use(express.json());
 app.use('/api/login',login);
app.use('/api/register',register);
app.use('/api/posts',posts);

const port =process.env.PORT || 8000;
app.listen (port,()=>console.log(`Listening to port ${port}`))