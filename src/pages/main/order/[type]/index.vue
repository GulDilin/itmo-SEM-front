<template>
  <div class="tw-flex tw-flex-col tw-gap-4">
    <v-btn
      v-if="orderType.dep_type === OrderDepType.MAIN.key"
      :to="{
        name: 'main-order-type-create',
        params: { ...$route.params },
      }"
      class="tw-sticky"
    >
      Создать новый
    </v-btn>
    <OrderTable
      v-if="orderType"
      :key="`${$route.path}.${orderType?.id}`"
      v-model:loading="loading"
      :order-type="orderType"
      show-parent-order
    />
  </div>
</template>

<script setup>
import { ref, watch, defineAsyncComponent } from 'vue'
const OrderTable = defineAsyncComponent(() => import('@/components/Order/OrderTable'))
import { OrderDepType } from '@/enums'

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
