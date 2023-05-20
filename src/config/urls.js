import axios from 'axios'

console.log({ env: import.meta.env })
const URL_API = import.meta.env.VITE_URL_API
if (!URL_API) throw Error('You need to provide backend url to continue')
const BASE_API_URL = `${URL_API}/api/`
const AXIOS_API = axios.create({ baseURL: BASE_API_URL })
AXIOS_API.defaults.withCredentials = true
AXIOS_API.defaults.headers.common['Referrer-Policy'] = 'no-referrer-when-downgrade'

console.log({ URL_API })

export default Object.freeze({
  URL_API,
  BASE_API_URL,
  AXIOS_API,
})
