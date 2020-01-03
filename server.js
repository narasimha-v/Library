if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config();
}

const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const expresslayout = require('express-ejs-layouts');
const mongoose = require('mongoose');
const indexRouter = require('./routes/index');
const authorRouter = require('./routes/authors')

app.set('view engine','ejs');
app.set('views',__dirname + '/views');
app.set('layout','layouts/layout');
app.use(expresslayout);
app.use(express.static('public'));

app.use('/',indexRouter)
app.use('/authors',authorRouter)

mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true});
mongoose.connection.on('error',error=>console.error(error));
mongoose.connection.once('open',()=>console.log('Connected to Mongo DB'));

app.listen(process.env.PORT,(err)=>{
    if(!err){
        console.log('Server Started');       
    }
})
