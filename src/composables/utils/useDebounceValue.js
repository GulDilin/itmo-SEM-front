import { debounce } from 'lodash-es'
import { ref, watch } from 'vue'

export default function useDebounceValue(value, timeout = 300, watchOptions = { immediate: true }) {
  const debounced = ref()
  const onUpdated = debounce(() => (debounced.value = value.value), timeout)
  watch(value, onUpdated, watchOptions)
  return debounced
}
