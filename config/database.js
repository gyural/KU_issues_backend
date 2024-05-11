const maria = require('mysql');

const conn = maria.createConnection({
    host : 'localhost',
    port : '3306',
    user:'root',
    password:'1234',
    database: 'new_schema'
});

// conn.connect(function(err) {
//   if (err) throw err;
//   conn.query("SELECT * FROM new_table", function (err, result, fields) {
//     if (err) throw err;
//     console.log(result);
//   });}
// )

module.exports = conn;