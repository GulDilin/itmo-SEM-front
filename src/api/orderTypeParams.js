import config from '@/config'
import useBasicApi from './useBasicApi'

const axios = config.urls.AXIOS_API

export default function orderTypeParamsApi(parent, orderTypeId) {
  const ENDPOINT = `${parent}/${orderTypeId}`
  return {
    ENDPOINT,
    ...useBasicApi(axios, ENDPOINT),
  }
}
