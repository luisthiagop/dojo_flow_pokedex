const express = require('express');
const router = express.Router();
const pokemonService = require('../services/pokemonService');

// Rota para obter informações de um Pokémon pelo nome
router.get('/:name', async (req, res) => {
    try {
        const name = req.params.name;
        const pokemonData = await pokemonService.getPokemonByName(name);
        res.json(pokemonData);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar Pokémon' });
    }
});

module.exports = router;