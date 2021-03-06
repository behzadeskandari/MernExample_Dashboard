const express = require('express');

const app = express();

const mongoose = require('mongoose');

const bodyParser = require('body-parser');
require('dotenv').config();

const users = require('./routes/api/users');

const articles = require('./routes/api/articles');
const {checkToken} = require('./middleware/auth');

const mongoUri = "mongodb+srv://admin:behzades@dashboard.gx5xfvb.mongodb.net/?retryWrites=true&w=majority";
const cors = require('cors');
mongoose.connect(mongoUri,{
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useCreateIndex: true,
    useFindAndModify:false,
})

app.use(cors());
app.use(bodyParser.json());
app.use(checkToken)
app.use("/api/users",users);

app.use("/api/articles",articles);


const Port = process.env.PORT || 3001;

app.listen(Port,()=>{
    console.log(`server running on port ${Port}`);
})

