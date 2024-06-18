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