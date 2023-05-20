const createKeyEnum = data =>
  Object.freeze({
    ...data,

    getByKey(key) {
      let dataKeys = {}
      Object.entries(data).forEach(([entryKey, { key }]) => {
        dataKeys[key] = this[entryKey]
      })
      return dataKeys[key]
    },

    getValues() {
      return Object.values(data)
    },
  })

export const SomeStatus = createKeyEnum({
  PENDING: { key: 'pending', text: 'Pending' },
})
