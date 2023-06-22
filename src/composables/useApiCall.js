import { ref } from 'vue'

export const useApiCall = f => {
  const loading = ref(false)
  const error = ref(false)
  const success = ref(false)

  // do not replace function declaration to
  // () => {} style because of arguments object
  function call() {
    const args = arguments
    loading.value = true
    error.value = false
    success.value = false

    return f
      ?.apply?.(null, args)
      .then(v => {
        success.value = true
        return v
      })
      .catch(v => {
        error.value = true
        return v
      })
      .finally(v => {
        loading.value = false
        return v
      })
  }

  return {
    loading,
    error,
    call,
    success,
  }
}
