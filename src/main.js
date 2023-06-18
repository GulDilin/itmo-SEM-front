import App from './App.vue'
import './assets/style/tailwind.scss'
import { addAxiosErrorHandler } from './composables/useRequestErrorHandler'
import config from './config'
import clickOutside from './directives/clickOutside'
import prototypesPlugin from './plugins/prototypes'
import router from './router'
import { createApp } from 'vue'
import { DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'
import vuetify from './plugins/vuetify'
import Keycloak from 'keycloak-js'

console.log({Keycloak})

addAxiosErrorHandler(config.urls.AXIOS_API)

let keycloak = Keycloak(`${config.urls.URL_API}/api/admin/auth/config`)

keycloak.init({ onLoad: 'login-required' })
.then((auth) => {
  if (!auth) {
    window.location.reload()
    return
  }

  createApp(App)
    .use(vuetify)
    .use(router)
    .use(prototypesPlugin)
    .component('DynamicScroller', DynamicScroller)
    .component('DynamicScrollerItem', DynamicScrollerItem)
    .directive('click-outside', clickOutside)
    .mount('#app')

  const refresh = keycloak.updateToken(70)
    .then((refreshed) => {
      if (refreshed) {
        console.log(`Token refreshed ${refreshed}`)
      } else {
        console.log('Token not refreshed , valid for '
          + Math.round(keycloak.tokenParsed.exp
          + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds')
      }
    }).catch(() => {
      console.error('Failed to refresh token');
    })
  setInterval(refresh, 6000)
})
