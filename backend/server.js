const express = require('express');
const path = require('path'); // Adicionando o módulo path
const db = require('./db');
const app = express();

app.use(express.json());

// Configurando para servir arquivos estáticos da pasta frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// Inicializa a conexão com o Oracle
db.initialize();

// Rota para listar todos os usuários
app.get('/api/users', async (req, res) => {
    const result = await db.executeQuery('SELECT * FROM users');
    res.send(result.rows);
});

// Rota para criar um usuário
app.post('/api/users', async (req, res) => {
    const { name, email } = req.body;
    await db.executeQuery('INSERT INTO users (name, email) VALUES (:name, :email)', [name, email]);
    res.send({ message: 'Usuário criado com sucesso' });
});

// Rota para deletar um usuário
app.delete('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    await db.executeQuery('DELETE FROM users WHERE id = :id', [id]);
    res.send({ message: 'Usuário deletado com sucesso' });
});

// Rota para atualizar um usuário
app.put('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email } = req.body;
    await db.executeQuery('UPDATE users SET name = :name, email = :email WHERE id = :id', [name, email, id]);
    res.send({ message: 'Usuário atualizado com sucesso' });
});

// Iniciar o servidor
app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
