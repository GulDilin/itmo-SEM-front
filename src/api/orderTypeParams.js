import useBasicApi from './useBasicApi'
import config from '@/config'

const axios = config.urls.AXIOS_API

export default function orderTypeParamsApi(parent, orderTypeId) {
  const ENDPOINT = `${parent}/${orderTypeId}`
  return {
    ENDPOINT,
    ...useBasicApi(axios, ENDPOINT),
  }
}
