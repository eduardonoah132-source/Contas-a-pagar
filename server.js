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

// 🔥 IMPORTANTE: conectar no banco
db.connect(err => {
  if (err) {
    console.error('Erro ao conectar no MySQL:', err);
    return;
  }
  console.log('MySQL conectado');
});

// ROTAS
app.get('/contas', (req, res) => {
  db.query('SELECT * FROM contas', (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Erro no banco');
    }
    res.json(result);
  });
});

app.post('/contas', (req, res) => {
  const { nome, valor, vencimento, tipo } = req.body;

  db.query(
    'INSERT INTO contas (nome, valor, vencimento, tipo, pago) VALUES (?, ?, ?, ?, false)',
    [nome, valor, vencimento, tipo],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Erro ao inserir');
      }
      res.json(result);
    }
  );
});

app.put('/contas/:id', (req, res) => {
  const id = req.params.id;

  db.query(
    'UPDATE contas SET pago = NOT pago WHERE id = ?',
    [id],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).send('Erro ao atualizar');
      }
      res.json(result);
    }
  );
});

// START
app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});