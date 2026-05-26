const mysql = require("mysql2");
const pool = mysql.createPool({ 
    host: "127.0.0.1",
    port: "3308",
    user: "root", 
    password: "", 
    database: "sistema_estoque", 
    waitForConnections: true, 
    connectionLimit: 10 });

module.exports = pool.promise();