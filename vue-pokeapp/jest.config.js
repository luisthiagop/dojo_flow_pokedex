module.exports = {
    moduleFileExtensions: ['js', 'json', 'vue'],
    transform: {
      '^.+\\.vue$': 'vue-jest',
      '^.+\\.js$': 'babel-jest'
    },
    testMatch: [
      '<rootDir>/vue-pokeapp/**/*.spec.js',  // Ajuste se necessário
      '<rootDir>/vue-pokeapp/**/*.spec.vue'  // Ajuste se necessário
    ],
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/vue-pokeapp/$1'
    },
    testPathIgnorePatterns: [
      '/node_modules/',
      '/vue-pokeapp/__tests__/'
    ]
  };