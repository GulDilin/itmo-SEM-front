import { computed, isRef, ref, watch } from 'vue'

export default function useObserver(
  constructor,
  onObserved = () => {},
  { isEnabled = undefined, observeConverter = v => v?.$el ?? v, root = undefined } = {}
) {
  const observer = ref(null)
  root ??= ref(null)
  const isEnabledV = computed(
    () => isEnabled === undefined || (isRef(isEnabled) ? isEnabled?.value : isEnabled)
  )

  const observe = () => observer.value?.observe(observeConverter(root.value))
  const unobserve = v => observer.value?.unobserve(observeConverter(v ?? root.value))

  watch([root, isEnabledV], ([rootV, enabled], [oldRoot, enabledOld]) => {
    if (oldRoot !== rootV || (!enabled && enabled !== enabledOld)) unobserve(oldRoot)
    if (oldRoot !== rootV && observer.value) delete observer.value
    if (!enabled) return
    if (!rootV) return
    observer.value = new constructor(onObserved, { root: null, threshold: 0.5 })
    observe()
  })

  return {
    root,
    observer,
    observe,
    unobserve,
  }
}
