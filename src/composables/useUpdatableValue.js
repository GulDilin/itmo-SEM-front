import { debounce } from 'lodash-es'
import { ref, watch } from 'vue'

export default function useUpdatableValue(value, emit, options) {
  let {
    converter = v => v,
    prevent = () => false,
    updateEventName = 'update:value',
    updateAlways = false,
    delay = 0,
  } = options ?? {}

  const updatableValue = ref(converter(value.value))
  const update = () => {
    const converted = converter(updatableValue.value)
    if (updatableValue.value !== converted) updatableValue.value = converted
    if (converted === value.value && !updateAlways) return
    emit(updateEventName, converted)
  }
  const postprocess = delay < 1 ? update : debounce(update, delay)
  emit(updateEventName, converter(updatableValue.value))
  watch(value, v => (updatableValue.value = converter(v)))
  watch(updatableValue, v => {
    if (prevent(v)) return
    postprocess()
  })

  return {
    updatableValue,
  }
}
