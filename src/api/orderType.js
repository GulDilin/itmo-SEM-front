import config from '@/config'
import useBasicApi from './useBasicApi'
import orderTypeParams from './orderTypeParams'

const axios = config.urls.AXIOS_API
const ENDPOINT = 'order_type'

export default {
  ENDPOINT,
  ...useBasicApi(axios, ENDPOINT),
  for: orderTypeId => ({
    params: orderTypeParams(ENDPOINT, orderTypeId),
  }),
}
