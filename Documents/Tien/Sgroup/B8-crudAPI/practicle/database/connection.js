const { log } = require("console");

const mysql = require('mysql2');

const conn = mysql.createConnection({

    host:"localhost",
    user:"root",
    password:"08012005",
    database:"SGr"
}).promise();
conn.connect()
    .then(()=>{
        
    })




module.exports = conn;
