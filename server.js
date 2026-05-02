/*
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'contas_app'
});

app.get('/contas',(req,res)=>{
  db.query('SELECT * FROM contas',(err,result)=>{
    if(err) throw err;
    res.json(result);
  });
});

app.post('/contas',(req,res)=>{
  const {nome,valor,vencimento,tipo} = req.body;
  db.query('INSERT INTO contas (nome,valor,vencimento,tipo,pago) VALUES (?,?,?,?,false)',
  [nome,valor,vencimento,tipo],(err,result)=>{
    if(err) throw err;
    res.json(result);
  });
});

app.put('/contas/:id',(req,res)=>{
  const id = req.params.id;
  db.query('UPDATE contas SET pago = NOT pago WHERE id=?',[id],(err,result)=>{
    if(err) throw err;
    res.json(result);
  });
});

app.listen(3000, () => console.log('Servidor rodando'));
*/
console.log('SERVIDOR INICIADO');

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('OK');
});

app.listen(3000, () => console.log('Rodando na porta 3000'));   