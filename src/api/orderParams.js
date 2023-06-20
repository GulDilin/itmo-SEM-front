import useBasicApi from './useBasicApi'
import config from '@/config'

const axios = config.urls.AXIOS_API

export default function orderParamsApi(parent, orderId) {
  const ENDPOINT = `${parent}/${orderId}`
  return {
    ENDPOINT,
    ...useBasicApi(axios, ENDPOINT),
  }
}
