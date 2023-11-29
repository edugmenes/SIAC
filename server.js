const express = require('express');
const sql = require('mssql');
const bodyParser = require('body-parser');
// Importar a biblioteca CORS
const cors = require('cors');

const app = express();

 

// Habilitar o CORS
app.use(cors({
  origin:'*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// Configura o Express para usar o body-parser


app.use(bodyParser.json());

const http = require('http');


// Configuração do banco de dados
const config = {
    server: 'localhost',
    user: 'teste',
    password: 'teste',
    database: 'Siac-Duca',
    options: {
        trustedConnection: false,
        trustServerCertificate: true
    }
};

// Conexão com o banco de dados
sql.connect(config).then(() => {
    console.log('Conectado ao banco de dados SQL Server!');
}).catch(err => {
    console.error('Erro ao conectar:', err);
});

// Rotas CRUD
app.get('/api/data', (req, res) => {
    const request = new sql.Request();
    const resp = request.query('SELECT * FROM Cliente', (err, result) => {
        if (err) console.error('Erro na consulta:', err);
        res.json(result.recordset);
    });
    return resp;
});

// Rota POST para criar um novo registro
app.post('/api/data', (req, res) => {
    const request = new sql.Request();
    // Obtém os dados do corpo da solicitação
    const { nome, telefone, sexo, endereco } = req.body;
    const query = `INSERT INTO Cliente (nome, telefone, sexo, endereco) VALUES ('${nome}', '${telefone}', '${sexo}', '${endereco}')`;
    request.query(query, (err, result) => {
        if (err) {
            console.error('Erro na consulta:', err);
            res.json(err);
    }else{
         res.json(result.recordset);
    }
    });
});

// Rota PUT para atualizar um registro existente
app.put('/api/data/:id', (req, res) => {
    const request = new sql.Request();
    const { nome, telefone, sexo, endereco } = req.body;
    // Substitua 'campo1', 'campo2', etc. pelos nomes dos campos na sua tabela
    // Substitua 'valor1', 'valor2', etc. pelos novos valores que você quer atualizar
    const query = `UPDATE Cliente SET nome = '${nome}', telefone = '${telefone}', sexo = '${sexo}'  WHERE id = ${req.params.id}`;
    request.query(query, (err, result) => {
        if (err) console.error('Erro na consulta:', err);
        res.json(result.recordset);
    });
});

// Rota DELETE para excluir um registro
app.delete('/api/data/:id', (req, res) => {
    const request = new sql.Request();
    const query = `DELETE FROM Cliente WHERE idCliente = ${req.params.id}`;
    request.query(query, (err, result) => {
        if (err) console.error('Erro na consulta:', err);
        res.json(result.recordset);
    });
});



// Iniciar o servidor
app.listen(3000,() => {
    console.log('Servidor rodando em http://127.0.0.1:3000/');
});
