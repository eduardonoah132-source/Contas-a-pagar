const mysql = require('mysql2');

const conexao = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'meubanco'
});

conexao.query("SHOW TABLES", (err, results) => {
  console.log(results);
});

