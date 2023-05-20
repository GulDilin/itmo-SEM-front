import { ref } from 'vue'

/**
 * @param {import('vue').Ref<boolean>} isVisibleRef
 */
export const useVisibilityToggler = (isVisibleRef = undefined) => {
  const isVisible = isVisibleRef ?? ref(false)
  const open = () => (isVisible.value = true)
  const close = () => (isVisible.value = false)
  const toggle = () => (isVisible.value = !isVisible.value)

  return {
    isVisible,
    open,
    close,
    toggle,
  }
}
