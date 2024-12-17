const mysql = require('mysql2');

const pool = mysql.createPool({
    host: 'localhost',
    // user: 'root',
    user: 'user',
    password: 'dominik04',
    database: 'clinic'
});
module.exports = pool.promise();