<template>
  <div class="tw-flex tw-flex-col tw-gap-4">
    <OrderMainCreate :order-type="orderType"></OrderMainCreate>
    <!-- <OrderForm :order-type="orderType"></OrderForm> -->
    <!-- <UsersTable></UsersTable> -->
  </div>
</template>

<script setup>
import OrderForm from '@/components/Order/OrderForm'
import OrderMainCreate from '@/components/Order/OrderMainCreate'
import UsersTable from '@/components/Users/UsersTable'

defineProps({
  orderType: {
    type: Object,
    default: () => ({}),
  },
})
</script>
