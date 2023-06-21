<template>
  <div class="tw-relative">
    <div class="tw-absolute tw-top-0 -tw-left-12">
      <v-progress-circular
        v-if="loading"
        indeterminate
      />
    </div>
    <v-alert
      v-if="error"
      type="error"
    >
      Произошла ошибка
    </v-alert>
    <RouterView v-model:order="item" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useApiCall } from '@/composables/useApiCall'
import api from '@/api'

const props = defineProps({
  id: String,
  orderType: {
    type: Object,
    default: () => ({}),
  },
})

const { call, loading, error } = useApiCall(api.orders.getById)
const item = ref()
watch(
  () => props.id,
  async v => {
    const { data } = await call(v)
    item.value = data
  },
  { immediate: true }
)
</script>
