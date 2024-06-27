module.exports = {
    mutator: "vue",
    packageManager: "npm",
    reporters: ["clear-text", "progress"],
    testRunner: "jest",
    jest: {
      config: require('./jest.config.js')
    },
    coverageAnalysis: "off",
    mutate: [
      "vue-pokeapp/**/*.vue",
      "!vue-pokeapp/**/__tests__/**/*.vue",
      "!vue-pokeapp/index.vue"  // Ajuste se necessário
    ]
};