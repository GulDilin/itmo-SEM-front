<template>
  <div class="tw-relative">
    <div class="tw-absolute tw-top-0 -tw-left-12">
      <v-progress-circular
        v-if="loading || loadingView"
        indeterminate
      />
    </div>
    <v-alert
      v-if="error"
      type="error"
    >
      Произошла ошибка
    </v-alert>
    <RouterView
      :key="$route.path"
      v-model:loading="loadingView"
      :order-type="orderType"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useApiCall } from '@/composables/useApiCall'
import api from '@/api'

const props = defineProps({
  type: {
    type: String,
    default: '',
  },
})
const loadingView = ref(false)

const orderType = ref()
const {
  call: getById,
  loading,
  error,
} = useApiCall(v => api.orderType.getById(v, { _dontShowError: true }))
watch(
  () => props.type,
  async v => {
    orderType.value = (await getById(v))?.data
    console.log({ orderType: orderType.value })
  },
  { immediate: true }
)
</script>
