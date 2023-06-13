import { md3 } from 'vuetify/blueprints'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
// import { aliases, md } from 'vuetify/iconsets/md'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'

export default createVuetify({
  components,
  directives,
  blueprint: md3,
  icons: {
    defaultSet: 'mdi',
    // aliases,
    // sets: {
      // md,
    // }
  },
})
