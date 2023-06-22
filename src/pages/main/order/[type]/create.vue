<template>
  <div class="tw-flex tw-flex-col tw-gap-4">
    <OrderMainCreate :order-type="orderType"></OrderMainCreate>
  </div>
</template>

<script setup>
import OrderMainCreate from '@/components/Order/OrderMainCreate'

defineProps({
  orderType: {
    type: Object,
    default: () => ({}),
  },
})
</script>
