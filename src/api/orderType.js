import order from './order'
import orderTypeParams from './orderTypeParams'
import useBasicApi from './useBasicApi'
import config from '@/config'

const axios = config.urls.AXIOS_API
const ENDPOINT = 'order_type'

export default {
  ENDPOINT,
  ...useBasicApi(axios, ENDPOINT),
  for: orderTypeId => ({
    params: orderTypeParams(ENDPOINT, orderTypeId),
    orders: order(ENDPOINT, orderTypeId),
  }),
}
