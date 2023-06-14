import config from '@/config'
import useBasicApi from './useBasicApi'

const axios = config.urls.AXIOS_API

export default function orderParamsApi(parent, orderId) {
  const ENDPOINT = `${parent}/${orderId}`
  return {
    ENDPOINT,
    ...useBasicApi(axios, ENDPOINT),
  }
}
