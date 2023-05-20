import { notifyError } from './useNotifications'
import { ref } from 'vue'
import config from '@/config'

export const user = ref({
  isLoggedIn: false,
  accessToken: '',
  data: {},
})

const localStorageAccessTokenKey = 'user.access_token'

export const getTokenFromStorage = () => localStorage.getItem(localStorageAccessTokenKey)
export const saveTokenToStorage = token => localStorage.setItem(localStorageAccessTokenKey, token)
export const removeStoredToken = () => localStorage.removeItem(localStorageAccessTokenKey)

const getJwtPayload = token => {
  try {
    return JSON.parse(atob(token.split('.')[1]))
  } catch (err) {
    notifyError('Token is incorrect')
    throw err
  }
}

export const signIn = ({ token, assignRoute = undefined, reload = true }) => {
  try {
    user.value.data = getJwtPayload(token)
    user.value.accessToken = token
    user.value.isLoggedIn = true
    saveTokenToStorage(token)
    config.urls.AXIOS_API.defaults.headers.common['Authorization'] = `Bearer ${token}`
  } catch (err) {
    signOut({ assignRoute: '/auth' })
  }
  if (assignRoute) location.assign(assignRoute)
  else if (reload) location.reload()
}

export const signOut = ({ assignRoute = undefined, reload = true } = {}) => {
  removeStoredToken()
  if (assignRoute) location.assign(assignRoute)
  else if (reload) location.reload()
}

export const signInSaved = () => {
  const token = getTokenFromStorage()
  if (token) signIn({ token, reload: false })
}
