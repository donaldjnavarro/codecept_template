const js = require("@eslint/js");
const globals = require("globals");
const markdown = require("eslint-plugin-markdown");

// Define CodeceptJS globals as readonly
const codeceptGlobals = {
  Feature: "readonly",
  Scenario: "readonly",
  Before: "readonly",
  After: "readonly",
  I: "readonly",
};

module.exports = [
  {
    ignores: [
      "output/**",
      "node_modules/**",
      "*.log",
    ],
  },
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "commonjs",
      globals: {
        // Spread existing browser globals
        ...globals.browser,
        // Add CodeceptJS globals
        ...codeceptGlobals,
      },
    },
    rules: {
      ...js.configs.recommended.rules,
    },
  },
  {
    files: ["**/*.md"],
    plugins: {
      markdown,
    },
    processor: "markdown/markdown",
    rules: {},
  },
];
