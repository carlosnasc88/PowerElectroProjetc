const express = require('express');
const { Pool } = require('pg');

// Configuração do pool de conexões PostgreSQL
const pool = new Pool({
  host: 'advisedly-pleasant-warthog.data-1.use1.tembo.io',
  port: 5432,
  user: 'postgres',
  password: '34gAHJFJSfzTulKG', 
  database: 'PowerBD',
  ssl: {
    rejectUnauthorized: false
  }
});

const app = express();
app.use(express.json()); // Para analisar o corpo das requisições como JSON

// Testar a conexão ao iniciar o servidor
pool.connect((err, client, release) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
  } else {
    console.log('Conectado ao banco de dados PostgreSQL');

      // Executar uma consulta de teste
      client.query('SELECT NOW()', (err, result) => {
        release();
        if (err) {
          console.error('Erro ao executar a consulta:', err);
        } else {
          console.log('Hora atual no banco de dados:', result.rows[0]);
        }
      });
    }
  });

  module.exports = pool;