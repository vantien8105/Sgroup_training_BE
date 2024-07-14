const bodyParser = require('body-parser');
const express = require('express');
const body_parser = require('body-parser');
const poll = require('./service/pool')
const app = express();



app.use(body_parser.json());
app.use('/', poll);
app.listen('3000', ()=>{
    console.log('Sever is running on port 3000');
});

