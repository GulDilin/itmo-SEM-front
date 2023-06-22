import { ref } from 'vue'
import config from '@/config'

export const user = ref({
  isLoggedIn: false,
  accessToken: '',
  data: {},
})
export const token = ref()
export const keycloak = ref()
export const tokenParsed = ref()

export const setKeycloak = data => {
  keycloak.value = data
}
export const hasRole = role => {
  return tokenParsed.value?.roles.includes(role)
}
export const setToken = data => {
  token.value = data.token
  tokenParsed.value = data.tokenParsed
  config.urls.AXIOS_API.defaults.headers.common['Authorization'] = `Bearer ${token.value}`
}
