import useBasicApi from './useBasicApi'
import config from '@/config'

const axios = config.urls.AXIOS_API

export default function orderParamsApi(parent, orderId) {
  const ENDPOINT = `${parent}/${orderId}/params`
  return {
    ENDPOINT,
    get: useBasicApi(axios, ENDPOINT).get,
    for: paramTypeid => ({
      ...useBasicApi(axios, `${ENDPOINT}/${paramTypeid}`),
      update: async (item) =>
        axios
          .put(`${ENDPOINT}/${paramTypeid}/`, item)
          .then(response => Promise.resolve(response))
          .catch(error => Promise.reject(error))

    }),
  }
}
