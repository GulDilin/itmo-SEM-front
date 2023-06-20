import { debounce } from 'lodash-es'
import { ref } from 'vue'
import { fetchAll, fetchAllNext, fetchAllStart } from '@/composables/useFetchingList'

export default function useItemsFetcher(provider, providerNext, filter, settings = {}) {
  const items = ref([])
  const next = ref(null)
  const cancel = ref(null)
  const cancelNext = ref(null)
  const total = ref(0)
  const loading = ref(false)
  const loadingAll = ref(false)
  const loadingKey = ref(1)

  const fetchItemsStart = async () => {
    if (loadingAll.value) return Promise.resolve()
    loading.value = true
    cancel?.value?.()
    cancelNext?.value?.()
    items.value = []
    return fetchAllStart({
      provider,
      items,
      total,
      next,
      loading,
      cancel,
      loadingKey,
      filter,
      settings,
    })
  }

  const fetchItemsNextV = async () =>
    fetchAllNext({
      providerNext,
      items,
      next,
      loading,
      cancel,
      loadingKey,
      settings,
    })

  const fetchItemsNext = debounce(fetchItemsNextV, 50)

  const fetchItemsAll = async () => {
    loading.value = true
    return fetchAll({
      provider,
      providerNext,
      items,
      filter,
      cancel,
      settings,
    }).finally(() => (loading.value = false))
  }

  return {
    items,
    next,
    cancel,
    cancelNext,
    total,
    loading,
    loadingAll,
    loadingKey,
    fetchItemsStart,
    fetchItemsNext,
    fetchItemsAll,
  }
}
