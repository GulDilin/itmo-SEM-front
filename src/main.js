import App from './App.vue'
import './assets/style/tailwind.scss'
import { addAxiosErrorHandler } from './composables/useRequestErrorHandler'
import config from './config'
import clickOutside from './directives/clickOutside'
import prototypesPlugin from './plugins/prototypes'
import vuetify from './plugins/vuetify'
import router from './router'
import Keycloak from 'keycloak-js'
import { createApp } from 'vue'
import { DynamicScroller, DynamicScrollerItem } from 'vue-virtual-scroller'
import 'vue-virtual-scroller/dist/vue-virtual-scroller.css'

console.log({ Keycloak })

addAxiosErrorHandler(config.urls.AXIOS_API)

let keycloak = Keycloak(`${config.urls.URL_API}/api/admin/auth/config`)

keycloak.init({ onLoad: 'login-required' }).then(async auth => {
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
  console.log({ auth, token: keycloak.token, tokenData: keycloak.tokenParsed })
  // console.log({ keycloak })
  const { setToken, setKeycloak } = await import('@/composables/useAuth')
  setToken({ token: keycloak.token, tokenParsed: keycloak.tokenParsed })
  setKeycloak(keycloak)

  const refresh = () =>
    keycloak
      .updateToken(70)
      .then(refreshed => {
        if (refreshed) {
          console.log(`Token refreshed ${refreshed}`)
          setToken({ token: keycloak.token, tokenParsed: keycloak.tokenParsed })
        }
      })
      .catch(() => {
        console.error('Failed to refresh token')
      })
  setInterval(() => refresh(), 6000)
})
