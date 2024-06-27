import { mount } from '@vue/test-utils';
import axios from 'axios';
import PokemonInfo from '@/components/PokemonInfo.vue'; // Ajuste o caminho conforme necessário

jest.mock('axios');

describe('PokemonInfo.vue', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(PokemonInfo);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('calls fetchPokemon on mount', () => {
    const fetchPokemonSpy = jest.spyOn(wrapper.vm, 'fetchPokemon');
    wrapper.vm.$mount();
    expect(fetchPokemonSpy).toHaveBeenCalledWith('pikachu');
  });

  it('fetchPokemon method makes an API call and updates pokemon data', async () => {
    const mockData = { name: 'pikachu', type: 'electric' };
    axios.get.mockResolvedValue({ data: mockData });

    await wrapper.vm.fetchPokemon('pikachu');

    expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/pokemon/pikachu');
    expect(wrapper.vm.pokemon).toEqual(mockData);
  });

  it('fetchPokemon method handles API errors', async () => {
    console.error = jest.fn();
    axios.get.mockRejectedValue(new Error('API Error'));

    await wrapper.vm.fetchPokemon('pikachu');

    expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/pokemon/pikachu');
    expect(wrapper.vm.pokemon).toBeNull();
    expect(console.error).toHaveBeenCalledWith('Erro ao buscar Pokémon:', expect.any(Error));
  });

  it('capitalize filter capitalizes the first letter of a string', () => {
    const result = wrapper.vm.$options.filters.capitalize('pikachu');
    expect(result).toBe('Pikachu');
  });

  it('capitalize filter returns an empty string for null or undefined input', () => {
    expect(wrapper.vm.$options.filters.capitalize(null)).toBe('');
    expect(wrapper.vm.$options.filters.capitalize(undefined)).toBe('');
  });
});