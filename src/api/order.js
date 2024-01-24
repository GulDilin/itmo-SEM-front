import materials from './materials'
import orderParams from './orderParams'
import useBasicApi from './useBasicApi'
import config from '@/config'

const axios = config.urls.AXIOS_API

export default function orderApi(parent, orderTypeId) {
  const ENDPOINT = `${parent}/${orderTypeId}/order`
  return {
    ENDPOINT,
    ...useBasicApi(axios, ENDPOINT),
    for: orderId => ({
      params: orderParams(ENDPOINT, orderId),
      materials: materials(ENDPOINT, orderId),
    }),
  }
}
