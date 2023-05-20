import { ref } from 'vue'

let id = 1
export const notifications = ref([])

export const clear = () => {
  notifications.value = []
}
export const removeById = targetId => notifications.value.removeBy({ id: targetId })
const getIncrementedId = () => id++

export const notifyAdd = ({
  title = '',
  text = '',
  type = 'info',
  time = 5,
  to = null,
  id = null,
}) => {
  const newId = id ?? getIncrementedId()
  if (notifications.value.findIndex(it => it.id === newId) === -1) {
    notifications.value.push({ id: newId, title, text, type, time, to })
    if (+time > 0) setTimeout(() => removeById(newId), time * 1000)
  }
}
export const notifySuccess = (text, to = null, id = null) =>
  notifyAdd({ text, to, type: 'success', id })
export const notifyWarning = (text, to = null, id = null) =>
  notifyAdd({ text, to, type: 'warning', id })
export const notifyError = (text, to = null, id = null) =>
  notifyAdd({ text, to, type: 'error', id })
export const notifyInfo = (text, to = null, id = null) => notifyAdd({ text, to, type: 'info', id })
