const { log } = require("console");

const mysql = require('mysql2');
require('dotenv').config(); // Đọc biến môi trường từ file .env

const conn = mysql.createConnection({

    host:"localhost",
    user:"root",
    password:process.env.passwordDB,
    database:process.env.nameDB
}).promise();
conn.connect()
    .then(()=>{        
    })

module.exports = conn;
