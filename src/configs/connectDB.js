import mysql from 'mysql2/promise';
//const mysql = require ('')

// create the connection to database
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'nodejsbasic'
});

export default pool;