Como um desenvolvedor senior, preciso criar uma estrutura bff em Node.JS
Que irá consumir uma api externa usando axios, e a api externa a ser consultada é a https://pokeapi.co/
____________________________________________________________________________________________________________

Tentei executar o comando "node index.js" para iniciar a aplicação, mas estou recebendo o seguinte erro

TypeError: Router.use() requires a middleware function but got a Object
    at Function.use (/home/lpadilha/repos/dojo_flow_pokedex/node_modules/express/lib/router/index.js:469:13)
    at Function.<anonymous> (/home/lpadilha/repos/dojo_flow_pokedex/node_modules/express/lib/application.js:227:21)
    at Array.forEach (<anonymous>)
    at Function.use (/home/lpadilha/repos/dojo_flow_pokedex/node_modules/express/lib/application.js:224:7)
    at Object.<anonymous> (/home/lpadilha/repos/dojo_flow_pokedex/bff/index.js:9:5)
    at Module._compile (node:internal/modules/cjs/loader:1149:14)
    at Module._extensions..js (node:internal/modules/cjs/loader:1203:10)
    at Module.load (node:internal/modules/cjs/loader:1027:32)
    at Module._load (node:internal/modules/cjs/loader:868:12)
    at Function.executeUserEntryPoint [as runMain] (node:internal/modules/run_main:81:12)


____________________________________________________________________________________________________________

Agora preciso criar uma projeto Vue que disponibilze uma página com as informações retornadas pela api criada anteriormente.
A pagina precisa conter s informações relevantes do pokemon

____________________________________________________________________________________________________________

Ao rodar o projeto com npm run serve, o console do navegador gerou o seguinte erro
Access to XMLHttpRequest at 'http://localhost:3000/pokemon/pikachu' from origin 'http://localhost:8080' has been blocked by CORS policy: No 'Access-Control-Allow-Origin' header is present on the requested resource.


____________________________________________________________________________________________________________


Agora, como um bom engenheiro você precisa cobrir esse projeto com testes unitários. Podemos começar pelo bff, lembrando que pretendemos usar o jest para isso. Lembre de verificar os teste de mutantes. Em primeiro momento foca no arquivo bff/services/pokemonService.js

____________________________________________________________________________________________________________
Estou realizando a cobertura de testes do meu projeto, e ao tentar executar os testes do stryker, recebo o erro "Invalid config file "stryker.conf.js". Default export of config file must be an object!"

meu arquivo stryker-conf.js está da seguinte forma:

module.exports = function(config) {
  config.set({
    mutator: "javascript",
    packageManager: "npm",
    reporters: ["clear-text", "progress"],
    testRunner: "jest",
    transpilers: [],
    testFramework: "jest",
    coverageAnalysis: "off",
    mutate: ["src/services/pokemonService.js"]
  });
};

________________________________________________________Caminho dos arquivos para teste do stryker
Preciso que ajuste o arquivo para que alcance todos os arquivos .js para teste e ignore todos os arquivos que possuam a pasta `__tests__`.
A pasta raiz do projeto é bff

--------------------------------------Alteração de config para exclusão de arquivos
Preciso que ajuste as configurações para que exclua o arquivo /bff/index.js do jest e do stryker 

-----------------------------------------------------------------------------------------
Escreva os testes unitários utilizando jest para um arquivo que contém essa estrutura
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

------------------------------------------------------------ Iniciando testes unitarios e stryker para o vue

Após realizar as configurações para o BFF, agora preciso que as mesmas configurações de Jest e Stryker sejam feitas para arquivos de VueJs (.vue), porém esses arquivos ficam em outra pasta e possuem outra organização

A pasta raiz que iremos trabalhar se chama vue-pokeapp e todos os arquivos dentro dela que possuem a extensão .vue devem ser testadas, ainda não gere os testes unitarios, preciso só de configurações.

------------------------------------------------------------ Iniciando testes unitarios no arquivo PokemonInfo
Após as configurações de testes feitas, preciso que crie uma cobertura de testes unitários em jest para o seguinte arquivo:

script>
import axios from 'axios';

export default {
  name: 'PokemonInfo',
  data() {
    return {
      pokemon: null,
    };
  },
  filters: {
    capitalize(value) {
      if (!value) return '';
      value = value.toString();
      return value.charAt(0).toUpperCase() + value.slice(1);
    },
  },
  methods: {
    async fetchPokemon(name) {
      try {
        const response = await axios.get(`http://localhost:3000/pokemon/${name}`);
        this.pokemon = response.data;
      } catch (error) {
        console.error('Erro ao buscar Pokémon:', error);
      }
    },
  },
  mounted() {
    const name = 'pikachu'; // Substitua pelo nome do Pokémon que deseja buscar
    this.fetchPokemon(name);
  },
};
</script>