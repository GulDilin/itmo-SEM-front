import { ref } from 'vue'

export default function useRequestWrapper(axiosCallback) {
  const loading = ref(false)
  function request() {
    const args = arguments
    return new Promise((resolve, reject) => {
      axiosCallback
        ?.apply?.(null, args)
        .then(({ data }) => resolve(data))
        .catch(reject)
    })
  }
  return {
    loading,
    request,
  }
}
