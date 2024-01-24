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

export const OrderStatus = createKeyEnum({
  NEW: { key: 'NEW', text: 'Новый', class: 'bg-primary' },
  READY: { key: 'READY', text: 'Готов к выполнению', class: 'bg-blue' },
  IN_PROGRESS: { key: 'IN PROGRESS', text: 'В процессе', class: 'bg-blue' },
  DONE: { key: 'DONE', text: 'Готово', class: 'bg-success' },
  ACCEPTED: { key: 'ACCEPTED', text: 'Принято', class: 'bg-success' },
  TO_REMOVE: { key: 'TO REMOVE', text: 'К удалению', class: 'bg-error' },
  REMOVED: { key: 'REMOVED', text: 'Удалено', class: 'bg-error' },
})

export const ROLE = createKeyEnum({
  STAFF: { key: 'staff', text: 'Сотрудник' },
  STAFF_ORDER_MANAGER: { key: 'staff_order_manager', text: 'Сопровождение заказов' },
  STAFF_CUSTOMER_MANAGER: { key: 'staff_customer_manager', text: 'Работа с клиентами' },
  STAFF_AXEMAN: { key: 'staff_axeman', text: 'Лесоруб' },
  STAFF_DELIVERY: { key: 'staff_delivery', text: 'Отдел доставки' },
  STAFF_MAGICIAN: { key: 'staff_magician', text: 'Отдел зачарования' },
  STAFF_CRAFTSMAN: { key: 'staff_craftsman', text: 'Ремесленник' },
})

export const OrderDepType = createKeyEnum({
  MAIN: { key: 'MAIN', text: 'Основной' },
  DEPEND: { key: 'DEPEND', text: 'Зависимый' },
  DELIVERY: { key: 'DELIVERY', text: 'Зависимый' },
  OPTIONAL: { key: 'OPTIONAL', text: 'Опциональный' },
  DEFECT: { key: 'DEFECT', text: 'Брак' },
})

export const OrderParamType = Object.freeze({
  INT: 'int',
  STR: 'string',
  TEXT: 'text',
  DATE: 'date',
})

export const MaterialValueType = createKeyEnum({
  VOLUME: { key: 'VOLUME', text: 'м3' },
  PIECE: { key: 'PIECE', text: 'шт' },
  MASS: { key: 'MASS', text: 'кг' },
})

export const getRolesString = roles =>
  roles
    ?.map(it => (typeof it === 'string' ? it : it?.name))
    ?.sort((a, b) => (a === ROLE.STAFF.key ? -1 : b === ROLE.STAFF.key ? 1 : 0))
    ?.map(it => ROLE.getByKey(it))
    ?.filter(it => !!it)
    ?.map(it => it?.text)
    ?.join(', ')
