module.exports = {
  mutator: "javascript",
  packageManager: "npm",
  reporters: ["clear-text", "progress"],
  testRunner: "jest",
  transpilers: [],
  testFramework: "jest",
  coverageAnalysis: "off",
  mutate: [
    "bff/**/*.js",
    "!bff/**/__tests__/**/*.js",
    "!bff/index.js"
  ]
};