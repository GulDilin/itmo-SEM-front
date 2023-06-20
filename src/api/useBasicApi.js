import { createFilterURL } from '@/utils/urls'

export default function useBasicApi(axios, ENDPOINT) {
  const create = async item =>
    axios
      .post(`${ENDPOINT}/`, item)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error))

  const update = async (id, item) =>
    axios
      .put(`${ENDPOINT}/${id}/`, item)
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error))

  const get = async (filter = {}, options = {}) =>
    axios({ ...options, method: 'get', url: createFilterURL(`${ENDPOINT}/`, filter) })
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error))

  const getById = async id =>
    axios({ method: 'get', url: `${ENDPOINT}/${id}/` })
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error))

  const getNext = async ({ url, options = {} }) =>
    axios({ ...options, method: 'get', url })
      .then(response => Promise.resolve(response))
      .catch(error => Promise.reject(error))

  return {
    ENDPOINT,
    create,
    update,
    get,
    getById,
    getNext,
  }
}
