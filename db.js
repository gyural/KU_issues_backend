require('dotenv').config();
const mariadb = require('mariadb');

console.log(process.env.DB_PASSWORD)

const conn = mariadb.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASSWORD,
    connectionLimit: 5,
    timeout: 50000
});

module.exports.conn = conn;