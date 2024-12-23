const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    // user: 'root',
    user: 'user',
    password: '',
    database: 'clinic'
});
module.exports = pool.promise();