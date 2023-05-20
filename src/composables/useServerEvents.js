import { fetchEventSource } from '@microsoft/fetch-event-source'
import { ref } from 'vue'
import { user } from '@/composables/useAuth'
import config from '@/config'

export const convert = ev => {
  try {
    return JSON.parse(ev?.data)
  } catch (err) {
    return ev?.data
  }
}

const handlers = new Map()

export const on = (eventName, callback) => {
  if (!handlers.has(eventName)) handlers.set(eventName, [])
  handlers.get(eventName).push(callback)
}
export const off = (eventName, callback) => {
  if (!handlers.has(eventName)) return
  const idx = handlers.get(eventName).findIndex(it => it === callback)
  if (idx > -1) handlers.get(eventName).splice(idx, 1)
}
const onmessage = ev => {
  if (!handlers.has(ev.event)) return
  handlers.get(ev.event).forEach(callback => callback(ev))
}

const controller = ref()
const close = () => controller.value?.abort?.()
const init = () => {
  close()
  if (!user.value.accessToken) return
  controller.value = new AbortController()

  fetchEventSource(`${config.urls.BASE_API_URL}events/stream/`, {
    headers: {
      Authorization: `Bearer ${user.value.accessToken}`,
    },
    signal: controller.value.signal,
    onmessage,
  })
}
init()
