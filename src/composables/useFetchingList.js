import axios from 'axios'
import { isRef } from 'vue'

export const generateCancel = () => {
  const source = axios.CancelToken.source()
  const cancelToken = source.token
  const cancel = () => source.cancel('aborted_by_user')
  return { source, cancelToken, cancel }
}

export const fetchAllStart = async ({
  provider,
  items,
  total,
  next,
  loading,
  cancel,
  loadingKey,
  filter,
  options = {},
  settings: { nextFieldName = 'next' } = {},
}) =>
  new Promise((resolve, reject) => {
    loading.value = true
    next.value = null

    if (cancel) {
      let { cancelToken, cancel: cancelV } = generateCancel()
      cancel.value = cancelV
      options = { ...options, cancelToken }
    }
    let loadingKeyNew
    if (loadingKey) {
      loadingKeyNew = ++loadingKey.value
    }
    filter = isRef(filter) ? filter.value : filter
    provider(filter, options)
      .then(async response => {
        const { data } = response
        items.value = data.results
        next.value = data[nextFieldName]
        total.value = data.count
        if (loadingKey && loadingKeyNew && loadingKey.value !== loadingKeyNew) {
          return resolve()
        }
        loading.value = false
        resolve(response)
      })
      .catch(error => {
        loading.value = false
        reject(error)
      })
  })

export const fetchAllNext = async ({
  providerNext,
  items,
  next,
  loading,
  cancel,
  loadingKey,
  options = {},
  settings: { nextFieldName = 'next' } = {},
}) =>
  new Promise((resolve, reject) => {
    const loadingKeyV = loadingKey.value
    if (!next.value) return resolve()
    if (loading.value) return resolve()
    loading.value = true

    if (cancel) {
      let { cancelToken, cancel: cancelV } = generateCancel()
      cancel.value = cancelV
      options = { ...options, cancelToken }
    }

    providerNext({ url: next.value, options })
      .then(response => {
        const { data } = response
        if (loadingKey && loadingKey.value !== loadingKeyV) return resolve()
        items.value.push(...data.results)
        next.value = data[nextFieldName]
        loading.value = false
        resolve(response)
      })
      .catch(error => {
        loading.value = false
        reject(error)
      })
  })

export const fetchAll = async ({
  provider,
  providerNext,
  items,
  filter = {},
  options = {},
  settings: { nextFieldName = 'next' } = {},
}) =>
  new Promise((resolve, reject) => {
    let next = null
    items.value = []

    const loadNext = () => {
      if (!next) return resolve()
      providerNext({ url: next, options })
        .then(({ data }) => {
          items.value.push(...data.results)
          next = data[nextFieldName]
          loadNext()
        })
        .catch(reject)
    }

    filter = isRef(filter) ? filter.value : filter
    provider({ filter: filter, options })
      .then(({ data }) => {
        items.value.push(...data.results)
        next = data[nextFieldName]
        loadNext()
      })
      .catch(reject)
  })
