O erro "TypeError: Router.use() requires a middleware function but got an Object" indica que você está tentando passar um objeto inválido para o `app.use()` no seu arquivo `index.js`. Isso geralmente acontece quando você exporta algo incorretamente ou usa a sintaxe errada ao importar o módulo.

Vamos revisar o código para garantir que tudo está sendo exportado e importado corretamente.

### 1. Verifique o arquivo `src/routes/pokemon.js`

Certifique-se de que você está exportando o `router` corretamente:

```js
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
```

### 2. Verifique o arquivo `src/index.js`

Certifique-se de que você está importando o `pokemonRoute` corretamente:

```js
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
```

### 3. Verifique o arquivo `src/services/pokemonService.js`

Certifique-se de que você está exportando a função `getPokemonByName` corretamente:

```js
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
```

### 4. Certifique-se de que a estrutura de pastas está correta

A estrutura de pastas deve estar conforme especificado anteriormente:

```
bff-pokeapi/
├── node_modules/
├── src/
│   ├── routes/
│   │   └── pokemon.js
│   ├── services/
│   │   └── pokemonService.js
│   └── index.js
├── package.json
└── README.md
```

### 5. Reinicie o Servidor

Depois de verificar e corrigir os arquivos, reinicie o servidor:

```sh
node src/index.js
```

Se todas as importações e exportações estiverem corretas, o servidor deve iniciar sem problemas. Essas verificações devem resolver o erro "TypeError: Router.use() requires a middleware function but got an Object".




----------------------------------- VUE





Para criar uma aplicação Vue que consuma a API BFF que você criou anteriormente e exiba as informações relevantes de um Pokémon, siga os passos abaixo:

### 1. Configuração do Projeto Vue

Primeiro, certifique-se de ter o Vue CLI instalado. Se não tiver, instale-o com o seguinte comando:

```sh
npm install -g @vue/cli
```

Em seguida, crie um novo projeto Vue:

```sh
vue create vue-pokeapp
```

Siga as instruções para configurar o projeto. Para um setup simples, você pode escolher a configuração padrão.

### 2. Estrutura do Projeto Vue

Navegue até a pasta do seu projeto:

```sh
cd vue-pokeapp
```

Instale o Axios para fazer requisições HTTP:

```sh
npm install axios
```

### 3. Criar Componente para Exibir Informações do Pokémon

Crie um novo componente chamado `PokemonInfo.vue` dentro da pasta `src/components`:

```vue
<template>
  <div v-if="pokemon">
    <h1>{{ pokemon.name | capitalize }}</h1>
    <img :src="pokemon.sprites.front_default" :alt="pokemon.name" />
    <ul>
      <li><strong>ID:</strong> {{ pokemon.id }}</li>
      <li><strong>Altura:</strong> {{ pokemon.height }}</li>
      <li><strong>Peso:</strong> {{ pokemon.weight }}</li>
      <li><strong>Tipo:</strong> 
        <span v-for="type in pokemon.types" :key="type.type.name">
          {{ type.type.name | capitalize }} 
        </span>
      </li>
      <li><strong>Habilidades:</strong>
        <ul>
          <li v-for="ability in pokemon.abilities" :key="ability.ability.name">
            {{ ability.ability.name | capitalize }}
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
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

<style scoped>
img {
  width: 150px;
  height: 150px;
}
</style>
```

### 4. Adicionar o Componente ao App.vue

Abra o arquivo `src/App.vue` e adicione o componente `PokemonInfo`:

```vue
<template>
  <div id="app">
    <PokemonInfo />
  </div>
</template>

<script>
import PokemonInfo from './components/PokemonInfo.vue';

export default {
  name: 'App',
  components: {
    PokemonInfo,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
```

### 5. Executar o Projeto Vue

Para iniciar o servidor de desenvolvimento do Vue, execute:

```sh
npm run serve
```

Acesse a aplicação no navegador em `http://localhost:8080`.

### 6. Melhorias

- **Busca Dinâmica:** Adicione um campo de busca para que o usuário possa digitar o nome do Pokémon que deseja buscar.
- **Tratamento de Erros:** Melhore o tratamento de erros para lidar com diferentes tipos de falhas (e.g., Pokémon não encontrado, problemas de rede).
- **Estilização:** Use uma biblioteca de estilos como Vuetify, BootstrapVue ou Tailwind CSS para melhorar a aparência da aplicação.

### Conclusão

Agora você tem uma aplicação Vue que consome a API BFF criada anteriormente e exibe as informações relevantes de um Pokémon. Sinta-se à vontade para expandir e melhorar conforme suas necessidades.


----------------------------------- Erro ao rodar o vue


O erro que você está enfrentando é devido à política de CORS (Cross-Origin Resource Sharing), que impede que a aplicação frontend faça requisições para um domínio diferente do seu próprio sem permissões adequadas.

Para resolver isso, você precisa configurar o servidor Express para permitir requisições de outros domínios. Você pode fazer isso usando o middleware cors.
1. Instalar o Middleware CORS

Primeiro, instale o pacote cors no seu projeto Node.js:

npm install cors

2. Configurar o Middleware CORS no Servidor Express

Em seguida, configure o middleware CORS no seu arquivo src/index.js:

const express = require('express');
const cors = require('cors');
const app = express();
const pokemonRoute = require('./routes/pokemon');

// Middleware para parsear JSON
app.use(express.json());

// Middleware CORS
app.use(cors());

// Rotas
app.use('/pokemon', pokemonRoute);

// Porta onde o servidor irá rodar
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

3. Testar a Aplicação

Após configurar o CORS, reinicie o servidor Node.js:

node src/index.js

Em seguida, inicie o servidor Vue novamente:

npm run serve

Agora, ao acessar a aplicação no navegador, as requisições para o servidor backend devem ser permitidas, e o erro de CORS não deve mais ocorrer.
Conclusão

Com o middleware CORS configurado, sua aplicação Vue poderá fazer requisições para o seu backend Node.js sem problemas de política de CORS. Isso deve resolver o erro que você estava enfrentando e permitir que você continue desenvolvendo sua aplicação.


----------------------------------- Cobertura do bff/services/pokemonService.js


Para cobrir seu projeto BFF com testes unitários utilizando Jest, siga os passos abaixo. Vamos focar inicialmente no arquivo `bff/services/pokemonService.js`.

### 1. Instalar Dependências de Teste

Primeiro, instale o Jest e outras dependências necessárias:

```sh
npm install --save-dev jest axios-mock-adapter
```

### 2. Configurar o Jest

Adicione a configuração do Jest no seu `package.json`:

```json
{
  "scripts": {
    "test": "jest"
  },
  "jest": {
    "testEnvironment": "node"
  }
}
```

### 3. Criar Testes para `pokemonService.js`

Vamos criar um arquivo de teste em `bff/services/__tests__/pokemonService.test.js` para cobrir o serviço de Pokémon.

#### Estrutura do Teste

```sh
mkdir -p bff/services/__tests__
```

Crie o arquivo `bff/services/__tests__/pokemonService.test.js`:

```js
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
```

### 4. Rodar os Testes

Execute os testes com o seguinte comando:

```sh
npm run test
```

### 5. Verificar Cobertura de Código

Para verificar a cobertura de código, adicione as configurações de cobertura de código no seu `package.json`:

```json
{
  "scripts": {
    "test": "jest --coverage"
  }
}
```

E então execute novamente os testes:

```sh
npm run test
```

### 6. Analisar o Relatório de Cobertura

Após executar os testes com a opção de cobertura, será gerado um relatório de cobertura que você pode utilizar para verificar quais partes do código foram cobertas pelos testes e quais não foram.

### 7. Configurar Testes de Mutantes (Mutation Testing)

Para realizar testes de mutantes, você pode usar uma ferramenta como o Stryker. Vamos configurá-la.

#### Instalar Stryker

```sh
npm install --save-dev @stryker-mutator/core @stryker-mutator/jest-runner
```

#### Configurar Stryker

Crie um arquivo de configuração `stryker.conf.js` na raiz do projeto:

```js
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
```

#### Executar Stryker

Para executar o Stryker, adicione um script no `package.json`:

```json
{
  "scripts": {
    "stryker": "stryker run"
  }
}
```

E então execute o Stryker:

```sh
npm run stryker
```

Isso executará os testes de mutantes e fornecerá um relatório detalhado sobre a robustez dos seus testes unitários.

### Conclusão

Agora você tem testes unitários configurados para o serviço `pokemonService.js` utilizando Jest e cobertura de código. Além disso, você configurou testes de mutantes usando Stryker para garantir que seus testes são robustos. A partir daqui, você pode expandir os testes para outras partes do seu projeto.