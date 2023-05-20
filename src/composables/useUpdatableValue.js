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

  const innerValue = ref(converter(value.value))
  const update = () => {
    const converted = converter(innerValue.value)
    if (innerValue.value !== converted) innerValue.value = converted
    if (converted === value.value && !updateAlways) return
    emit(updateEventName, converted)
  }
  const postprocess = delay < 1 ? update : debounce(update, delay)
  emit(updateEventName, converter(innerValue.value))
  watch(value, v => (innerValue.value = converter(v)))
  watch(innerValue, v => {
    if (prevent(v)) return
    postprocess()
  })

  return {
    innerValue,
  }
}
