module.exports = {
  plugins: [
    require('@trivago/prettier-plugin-sort-imports'),
    require('prettier-plugin-tailwindcss'),
  ],
  trailingComma: 'es5',
  tabWidth: 2,
  semi: false,
  singleQuote: true,
  singleAttributePerLine: true,
  bracketSameLine: false,
  arrowParens: 'avoid',
  printWidth: 100,
  importOrder: ['^@/components/(.*)$', '^@/composables/(.*)$', '^@/(.*)$'],
  importOrderSeparation: false,
  importOrderSortSpecifiers: true,
  endOfLine: 'lf',
}
