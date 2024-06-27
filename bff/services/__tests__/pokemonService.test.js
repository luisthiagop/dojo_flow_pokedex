const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const pokemonService = require('../pokemonService');

describe('pokemonService', () => {
    let mock;

    beforeAll(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.reset();
    });

    afterAll(() => {
        mock.restore();
    });

    it('deve retornar dados do Pokémon quando o nome é válido', async () => {
        const mockData = {
            name: 'pikachu',
            id: 25,
            height: 4,
            weight: 60,
            sprites: {
                front_default: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/25.png'
            },
            types: [{ type: { name: 'electric' } }],
            abilities: [{ ability: { name: 'static' } }]
        };

        mock.onGet('https://pokeapi.co/api/v2/pokemon/pikachu').reply(200, mockData);

        const result = await pokemonService.getPokemonByName('pikachu');
        expect(result).toEqual(mockData);
    });

    it('deve lançar erro quando a API retorna erro', async () => {
        mock.onGet('https://pokeapi.co/api/v2/pokemon/invalid').reply(404);

        await expect(pokemonService.getPokemonByName('invalid')).rejects.toThrow('Erro ao buscar dados do Pokémon');
    });
});