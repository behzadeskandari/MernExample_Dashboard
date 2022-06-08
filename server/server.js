const express = require('express');

const app = express();

const mongoose = require('mongoose');

const bodyParser = require('body-parser');
require('dotenv').config();


const mongoUri = 'mongodb+srv://behzades:behzades@dashboardproject.vj3uctg.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(mongoUri,{
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useCreateIndex: true,
})

app.use(bodyParser.json());

const Port = process.env.PORT || 3001;

app.listen(Port,()=>{
    console.log(`server running on port ${Port}`);
})
