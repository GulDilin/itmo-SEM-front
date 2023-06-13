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

addAxiosErrorHandler(config.urls.AXIOS_API)

createApp(App)
  .use(vuetify)
  .use(router)
  .use(prototypesPlugin)
  .component('DynamicScroller', DynamicScroller)
  .component('DynamicScrollerItem', DynamicScrollerItem)
  .directive('click-outside', clickOutside)
  .mount('#app')
