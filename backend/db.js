const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'tienda'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Conectado a MySQL (XAMPP)');
});

module.exports = db;