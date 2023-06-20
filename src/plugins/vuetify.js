import { createVuetify } from 'vuetify'
import { md3 } from 'vuetify/blueprints'
// import { aliases, md } from 'vuetify/iconsets/md'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
// import '@mdi/font/css/materialdesignicons.css'
import { aliases, mdi } from 'vuetify/iconsets/mdi-svg'
import 'vuetify/styles'

// import { aliases, mdi } from 'vuetify/iconsets/mdi'

const mpiTheme = {
  dark: false,
  colors: {
    background: '#8E5572',
    surface: '#F2F7F2',
    primary: '#443850',
    'theme-brown': '#BCAA99',
    'theme-light': '#F2F7F2',
    'theme-purple': '#8E5572',
    'theme-green': '#BBBE64',
  },
}

export default createVuetify({
  components,
  directives,
  blueprint: md3,
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi,
    },
  },
  themes: {
    defaultTheme: 'mpiTheme',
    mpiTheme,
  },
})
