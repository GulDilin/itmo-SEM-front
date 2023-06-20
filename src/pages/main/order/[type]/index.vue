<template>
  <div class="tw-flex tw-flex-col tw-gap-4">
    <v-btn
      :to="{
        name: 'main-order-type-create',
        params: { ...$route.params },
      }"
    >
      Создать новый
    </v-btn>
    <OrderTable
      v-if="orderType"
      :key="orderType.id"
      v-model:loading="loading"
      :order-type="orderType"
    />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import OrderTable from '@/components/Order/OrderTable'

defineProps({
  orderType: {
    type: Object,
    default: () => ({}),
  },
})
const emit = defineEmits(['update:loading'])

const loading = ref(false)
watch(loading, v => emit('update:loading', v))
</script>
