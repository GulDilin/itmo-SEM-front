import { signOut } from './useAuth'
import { notifyError } from './useNotifications'
import axios from 'axios'

const getDetailMessages = data => {
  if (!data) return []
  if (typeof data === 'string') return [data]
  const results = []
  if (Array.isArray(data)) {
    data = Array.from(data)
    data.forEach(it => {
      if (typeof it === 'string') {
        results.push(it)
        return
      }
      if (!it?.loc) return
      let message = it?.msg || it?.message
      results.push(`${it.loc}: ${message}`)
    })
  }
  return results
}

const getJsonMessages = data => {
  let ignoreKeys = ['code']
  let noPrefixKeys = ['detail', 'non_field_errors']
  let result = []
  const capitalize = v => v.charAt(0).toUpperCase() + v.slice(1)

  if (data && typeof data === 'object') {
    if (data?.detail) return getDetailMessages(data.detail)
    Object.entries(data).forEach(([key, value]) => {
      if (ignoreKeys.includes(key)) return
      if (!isNaN(+key)) key = ''
      if (noPrefixKeys.includes(key)) key = ''
      if (key) key = `${capitalize(key)}: `
      if (!Array.isArray(value)) value = [value]
      value.forEach(it => {
        if (typeof it === 'string') result.push(`${key}${it}`)
        if (typeof it === 'object' && it?.msg) result.push(`${key}${it}`)
      })
    })
  }
  return result
}

export const getErrorMessages = error => {
  let result = getJsonMessages(error?.response?.data)
  const status = error?.response?.status
  const SPECIAL_STATUS_MESSAGES = {
    500: 'Internal Server Error',
    501: 'Method is not allowed',
    503: 'Service is Unavailable. Try later',
  }

  if (result.length < 1 && status && SPECIAL_STATUS_MESSAGES[status]) {
    result.push(SPECIAL_STATUS_MESSAGES[status])
  }
  if (result.length < 1 && error?.message) result.push(error.message)
  if (result.length < 1) result.push('Request finished with error')

  const NETWORK_ERROR_ORIGINAL = 'Network Error'
  const NETWORK_ERROR_REPLACE = 'Server unavailable'
  result = result.map(it => (it == NETWORK_ERROR_ORIGINAL ? NETWORK_ERROR_REPLACE : it))
  return result
}

export const addAxiosErrorHandler = axiosInstance => {
  axiosInstance.interceptors.response.use(
    response => response,
    error => {
      // do not change forEach( it => notifyError(it) ) to forEach(notifyError)
      // because of multiple args in notify method (for example to will be an index)
      if (!axios.isCancel(error) && !error.config?._dontShowError) {
        getErrorMessages(error).forEach(it => notifyError(it))
      }
      if (
        error?.response?.status === 401 &&
        error.config &&
        !error.config.url.startsWith('auth/login')
      ) {
        console.log('Sign Out')
        signOut()
      }
      return Promise.reject(error)
    }
  )
}

export default {
  addAxiosErrorHandler,
  getErrorMessages,
}
