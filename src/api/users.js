import useBasicApi from './useBasicApi'
import config from '@/config'

const axios = config.urls.AXIOS_API
const ENDPOINT = 'admin/users'

export default {
  ENDPOINT,
  ...useBasicApi(axios, ENDPOINT),
}
