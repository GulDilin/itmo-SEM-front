import config from '@/config'
import useBasicApi from './useBasicApi'
import orderParams from './orderParams'

const axios = config.urls.AXIOS_API
const ENDPOINT = 'order'

export default {
  ENDPOINT,
  ...useBasicApi(axios, ENDPOINT),
  for: orderId => ({
    params: orderParams(ENDPOINT, orderId),
  }),
}
