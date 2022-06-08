const mongoose = require('mongoose');
import { screen } from '@testing-library/react';


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const validator = require('validator');


require('dotenv').config();

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value){
            if (!validator.isEmail(value)) {
                throw new Error("Invalid Email");
            }
        }
    },
    password:{
        type: String,
        required:true,
        trim: true,
    },
    role:{
        type:String,
        enum: ['user','behzades'],
        default:'user',
    },
    firstname: {
        type: String,
        maxLength: 100,
        trim: true,
    },
    lastname:{
        type: String,
        maxLength: 100,
        trim: true,    
    },
    age:{
        type: Number,
    },
    date: {
        type: Date,
        default: Date.now
    }
},{
    //timestamps: true,
    //collection: "Players"  //changes the name of the schema
});




const User = mongoose.model('User', userSchema);

module.exports = { User };