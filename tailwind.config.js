const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx,vue}'],
  theme: {
    fontSize: {
      xs: ['9px', '12px'],
      sm: ['11px', '14px'],
      base: ['13px', '16px'],
      lg: ['16px', '24px'],
      xl: ['20px', '28px'],
      '2xl': ['24px', '32px'],
    },
    screens: {
      ...defaultTheme.screens,
      '3xl': '1920px',
    },
    extend: {
      colors: {
        main: '#111111'
      },
      textColor: {
        main: '#111111'
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
