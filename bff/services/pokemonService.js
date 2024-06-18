const axios = require('axios');

const getPokemonByName = async (name) => {
    try {
        const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        return response.data;
    } catch (error) {
        throw new Error('Erro ao buscar dados do Pokémon');
    }
};

module.exports = {
    getPokemonByName,
};