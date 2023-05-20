/**
 * Helps to wrap a dialog with visibility functions
 * @param {import('vue').Ref<?>} dialog
 */
export const useDialogWrapper = dialog => {
  const open = () => dialog.value?.open()
  const close = () => dialog.value?.close()
  const toggle = () => dialog.value?.toggle()

  return { open, close, toggle }
}
