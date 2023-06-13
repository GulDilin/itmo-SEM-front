const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  theme: {
    fontSize: {
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
        main: '#111111',
        primary: '#443850',
        brown: '#BCAA99',
        light: '#F2F7F2',
        purple: '#8E5572',
        green: '#BBBE64',
      },
      textColor: {
        main: '#111111',
        primary: '#443850',
        brown: '#BCAA99',
        light: '#F2F7F2',
        purple: '#8E5572',
        green: '#BBBE64',
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
          minWidth: 1270,
          maxWidth: 1800,
          paddingLeft: 16 * 4,
          paddingRight: 16 * 4,
        }
      })
    }),
  ],
}
