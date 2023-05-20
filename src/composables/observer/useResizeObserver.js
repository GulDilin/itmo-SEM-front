import useObserver from './useObserver'
import { ref } from 'vue'

export default function useResizeObserver(
  root = undefined,
  onObserved = undefined,
  options = undefined
) {
  const width = ref(0)
  const height = ref(0)

  const updateObserveEntryWidth = entries => {
    entries.forEach(entry => {
      width.value = entry.contentRect.width
      height.value = entry.contentRect.height
    })
  }

  onObserved ??= updateObserveEntryWidth

  return { ...useObserver(ResizeObserver, onObserved, { ...options, root }), width, height }
}
