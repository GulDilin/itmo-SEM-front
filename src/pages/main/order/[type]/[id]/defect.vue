<template>
  <div class="w-full tw-flex tw-flex-row tw-gap-8">
    <div
      v-if="order"
      class="tw-flex tw-flex-col tw-gap-4 tw-flex-equal"
    >
      <OrderCard
        v-model:item="order"
        @update:model-value="emit('update:order', $event)"
      />
      <div class="tw-flex tw-flex-col tw-gap-2 tw-rounded-xl tw-bg-brown tw-p-4">
        <div class="tw-text-light">Связанные</div>
        <OrderCard
          v-for="(item, i) in subOrders"
          :key="item?.id"
          v-model:item="subOrders[i]"
        />
      </div>
      <AppIntersectLoader @shown="fetchItemsNext" />
    </div>
    <div class="tw-flex tw-flex-col tw-gap-2 tw-flex-equal">
      <OrderForm
        v-if="order"
        :order-type="defectOrderType"
        :user-customer="order.user_customer"
        :parent-order-id="order.id"
        @created="
          $router.push({
            name: 'order-type-id',
            params: { type: defectOrderType?.name, id: $event?.id },
          })
        "
      />
    </div>
  </div>
</template>

<script setup>
import { computed, inject, toRef, watch } from 'vue'
import AppIntersectLoader from '@/components/App/AppIntersectLoader'
import OrderCard from '@/components/Order/OrderCard'
import OrderForm from '@/components/Order/OrderForm'
import useItemsFetcher from '@/composables/useItemsFetcher'
import api from '@/api'
import { OrderDepType } from '@/enums'

const props = defineProps({
  // id: String,
  order: Object,
})
const emit = defineEmits(['update:order'])

const order = toRef(props, 'order')
const orderTypes = inject('orderTypes')

const defectOrderType = computed(() =>
  orderTypes?.value?.findBy({ dep_type: OrderDepType.DEFECT.key })
)
const filter = computed(() => ({ sort: '-created_at', parent_order_id: order.value?.id }))
const { get, getNext } = api.orders
const { items: subOrders, fetchItemsStart, fetchItemsNext } = useItemsFetcher(get, getNext, filter)

watch(
  order,
  v => {
    if (!v) return
    fetchItemsStart()
  },
  { immediate: true }
)
</script>
