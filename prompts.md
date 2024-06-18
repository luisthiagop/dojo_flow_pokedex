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