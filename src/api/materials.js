import useBasicApi from './useBasicApi'
import config from '@/config'

const axios = config.urls.AXIOS_API

export default function materialsApi(parent, orderId) {
  const ENDPOINT = `${parent}/${orderId}/materials`
  return {
    ENDPOINT,
    get: useBasicApi(axios, ENDPOINT).get,
    create: useBasicApi(axios, ENDPOINT).create,
    for: materialId => ({
      ...useBasicApi(axios, `${ENDPOINT}/${materialId}`),
      update: async item =>
        axios
          .put(`${ENDPOINT}/${materialId}/`, item)
          .then(response => Promise.resolve(response))
          .catch(error => Promise.reject(error)),
      remove: async () =>
        axios
          .delete(`${ENDPOINT}/${materialId}/`)
          .then(response => Promise.resolve(response))
          .catch(error => Promise.reject(error)),
    }),
  }
}
