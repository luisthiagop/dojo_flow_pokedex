const request = require('supertest');
const express = require('express');
const router = require('../../routes/pokemon'); // Ajuste o caminho para o arquivo do seu router
const pokemonService = require('../../services/pokemonService');

const app = express();
app.use(express.json());
app.use('/pokemon', router);

jest.mock('../../services/pokemonService');

describe('Pokemon Routes', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return pokemon data when given a valid name', async () => {
    const mockPokemonData = { name: 'pikachu', type: 'electric' };
    pokemonService.getPokemonByName.mockResolvedValue(mockPokemonData);

    const response = await request(app).get('/pokemon/pikachu');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockPokemonData);
  });

  it('should return 500 status code and error message when service throws an error', async () => {
    pokemonService.getPokemonByName.mockRejectedValue(new Error('Service Error'));

    const response = await request(app).get('/pokemon/pikachu');

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Erro ao buscar Pokémon' });
  });
});