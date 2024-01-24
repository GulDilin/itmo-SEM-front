<template>
  <div class="tw-my-4 tw-text-lg tw-text-light">Материалы</div>
  <MaterialsTable
    v-if="order"
    :order="order"
    :order-type="order?.order_type"
  />
  <template
    v-for="subOrder in linkedOrders"
    :key="subOrder.id"
  >
    <div class="tw-my-4 tw-text-light">Материалы для {{ subOrder.order_type?.name }}</div>
    <MaterialsTable
      :order="subOrder"
      :order-type="subOrder?.order_type"
    />
  </template>
</template>

<script setup>
import MaterialsTable from './MaterialsTable.vue'
import { computed, onMounted, ref, watchEffect } from 'vue'
import useItemsFetcher from '@/composables/useItemsFetcher'
import api from '@/api'
import { OrderDepType } from '@/enums'

const props = defineProps({
  order: Object,
})

const isMainOrder = computed(() => props.order?.order_type?.dep_type === OrderDepType.MAIN.key)

const { get, getNext } = api.orders
const filter = computed(() => ({ parent_order_id: props.order?.id }))
const { items: linkedOrders, fetchItemsAll } = useItemsFetcher(get, getNext, filter)
watchEffect(() => console.log({ orderId: props.order?.id, linkedOrders: [...linkedOrders.value] }))
// watchEffect(() => console.log({ linkedOrders: linkedOrders.value }))

onMounted(() => {
  console.log({
    isMainOrder: isMainOrder.value,
    order: props.order,
    orderId: props.order?.id,
    filter: filter.value,
  })
  if (isMainOrder.value) fetchItemsAll()
})
</script>
