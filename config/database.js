const maria = require('mysql');

const conn = maria.createConnection({
    host : 'localhost',
    port : '3306',
    user:'root',
    password:'1234',
    database: 'new_schema'
});

conn.connect(function(err) {
  if (err) {
    console.error('mariaDB connection error:', err);
  } else {
    console.log("mariaDB connected");
  }
});

module.exports = conn;