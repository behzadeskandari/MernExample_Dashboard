const mongoose = require('mongoose');
import { screen } from '@testing-library/react';


const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const validator = require('validator');


require('dotenv').config();

const userSchema = mongoose.Schema({

})


const User = mongoose.model('User', userSchema);

module.exports = { User };