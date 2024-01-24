<template>
  <v-dialog width="500">
    <template #activator="{ props }">
      <v-btn
        v-bind="props"
        color="success"
        class="tw-ml-auto"
        :loading="loading"
        @click.prevent
      >
        Передать в доставку
      </v-btn>
    </template>

    <template #default="{ isActive }">
      <OrderForm
        v-if="orderType"
        :user-customer="order.user_customer"
        :parent-order-id="order?.id"
        :order-type="orderType"
        @created="isActive.value = false"
      />
    </template>
  </v-dialog>
</template>

<script setup>
import OrderForm from './OrderForm.vue'
import { computed } from 'vue'
import useItemsFetcher from '@/composables/useItemsFetcher'
import api from '@/api'
import { OrderDepType } from '@/enums'

defineProps({
  order: {
    type: Object,
    default: () => ({}),
  },
})
const { get, getNext } = api.orderType
const { items: orderTypes, loading, fetchItemsAll } = useItemsFetcher(get, getNext)
fetchItemsAll()
const orderType = computed(() => orderTypes.value?.findBy({ dep_type: OrderDepType.DELIVERY.key }))
</script>
