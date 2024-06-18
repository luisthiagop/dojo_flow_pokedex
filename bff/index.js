const express = require('express');
const app = express();
const pokemonRoute = require('./routes/pokemon');

// Middleware para parsear JSON
app.use(express.json());

// Rotas
app.use('/pokemon', pokemonRoute);

// Porta onde o servidor irá rodar
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});