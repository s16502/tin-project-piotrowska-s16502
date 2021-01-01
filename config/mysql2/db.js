const mysql = require('mysql2');

const pool = mysql.createPool({
   host: 'localhost',
   user: 'root',
   password: 'root',
   database: 'tin-s16502',
});

module.exports = pool;

