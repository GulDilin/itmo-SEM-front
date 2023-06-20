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

export const ROLE = createKeyEnum({
  STAFF: { key: 'staff', text: 'Сотрудник' },
  STAFF_ORDER_MANAGER: { key: 'staff_order_manager', text: 'Сопровождение заказов' },
  STAFF_AXEMAN: { key: 'staff_axeman', text: 'Лесоруб' },
})

export const getRolesString = roles =>
  roles
    ?.map(it => (typeof it === 'string' ? it : it?.name))
    ?.sort((a, b) => (a === ROLE.STAFF.key ? -1 : b === ROLE.STAFF.key ? 1 : 0))
    ?.map(it => ROLE.getByKey(it))
    ?.filter(it => !!it)
    ?.map(it => it?.text)
    ?.join(', ')
