const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  prefix: 'tw-',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  theme: {
    fontSize: {
      xs: '10px',
      sm: '12px',
      base: '14px',
      lg: '24px',
      xl: '40px',
      '2xl': '120px',
    },
    screens: {
      ...defaultTheme.screens,
      '3xl': '1920px',
    },
    extend: {
      colors: {
        'theme-main': '#111111',
        'theme-primary': '#443850',
        'theme-brown': '#BCAA99',
        'theme-light': '#F2F7F2',
        'theme-purple': '#645276',
        'theme-green': '#BBBE64',
        'main': '#111111',
        'primary': '#443850',
        'brown': '#BCAA99',
        'light': '#F2F7F2',
        'purple': '#645276',
        'green': '#BBBE64',
      },
      textColor: {
        'theme-main': '#111111',
        'theme-primary': '#443850',
        'theme-brown': '#BCAA99',
        'theme-light': '#F2F7F2',
        'theme-purple': '#645276',
        'theme-green': '#BBBE64',
        'main': '#111111',
        'primary': '#443850',
        'brown': '#BCAA99',
        'light': '#F2F7F2',
        'purple': '#645276',
        'green': '#BBBE64',
      },
    }
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.flex-equal': {
          'flex-basis': 0,
          'flex-grow': 1,
        },
        '.layout-container': {
          width: '100%',
          minWidth: 800,
          maxWidth: 1800,
          paddingLeft: 16 * 4,
          paddingRight: 16 * 4,
        },
        '.pl-layout-container': {
          paddingLeft: 16 * 4,
        },
         '.pr-layout-container': {
          paddingRight: 16 * 4,
        },
         '.px-layout-container': {
          paddingLeft: 16 * 4,
          paddingRight: 16 * 4,
        }
      })
    }),
  ],
}
