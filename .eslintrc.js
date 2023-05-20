module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    es2022: true,
  },
  extends: [
    'plugin:vue/vue3-recommended',
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:tailwindcss/recommended',
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 2022,
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.vue', '.js', '.json'],
      },
      node: {
        extensions: ['.vue', '.js', '.json'],
      },
    },
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/require-default-prop': 'off',
    'comma-dangle': ['error', 'only-multiline'],
    curly: [1, 'multi-line'],
    semi: 0,
    'vue/singleline-html-element-content-newline': [
      'error',
      {
        ignoreWhenNoAttributes: true,
        ignoreWhenEmpty: true,
        ignores: ['pre', 'textarea', 'h1', 'h2', 'h3', 'h4', 'h5', 'a', 'b', 'p', 'li', 'slot', 'template'],
      },
    ],
    'vue/no-undef-components': [
      'error',
      {
        ignorePatterns: ['router-link', 'router-view', 'recycle-scroller', 'dynamic-scroller-item', 'dynamic-scroller'],
      },
    ],
    'vue/no-v-model-argument': 'off',
    'vue/html-self-closing': 'off',
    'vue/no-v-for-template-key': 'off',
    'vue/multi-word-component-names': 'off',
    'vue/script-setup-uses-vars': 'error',
    'vue/require-prop-types': 'error',
    'vue/require-valid-default-prop': 'error',
    'vue/no-unused-properties': 1,
    'vue/no-unused-refs': 'error',
    'vue/no-useless-mustaches': 'error',
    'vue/no-useless-v-bind': 'error',
    'vue/no-v-text': 'error',
    'vue/padding-line-between-blocks': 1,
    'vue/prefer-separate-static-class': 1,
    'vue/prefer-true-attribute-shorthand': 1,
    'vue/no-undef-properties': 'error',
    'tailwindcss/no-custom-classname': 'off',
    'no-extend-native': 'off',
    'space-in-parens': 1,
    'no-unused-vars': 1,
  },
}
