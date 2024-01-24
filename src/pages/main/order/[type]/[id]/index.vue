<template>
  <div>
    <OrderCard
      v-if="order"
      :item="order"
      editable
      no-link
      @update:item="emit('update:order', $event)"
    />
    <div class="tw-my-4 tw-text-lg tw-text-light">Материалы</div>
    <MaterialsTable
      v-if="order"
      :order="order"
      :order-type="order?.order_type"
    />
    <div class="tw-my-4 tw-text-lg tw-text-light">Связанные</div>
    <OrderTable
      v-if="order"
      ref="orderTable"
      :api="api.orders"
      :filter="{ parent_order_id: id }"
    >
      <template #prepend>
        <OrderFormOption
          v-if="hasOption"
          :parent-order="order"
          :customer-id="order?.user_customer"
          @created="orderTable?.refresh()"
        />
      </template>
    </OrderTable>
  </div>
</template>

<script setup>
import { computed, defineAsyncComponent, ref } from 'vue'
import MaterialsTable from '@/components/Materials/MaterialsTable'
import OrderCard from '@/components/Order/OrderCard'
import api from '@/api'
import { OrderDepType, OrderStatus } from '@/enums'

const OrderFormOption = defineAsyncComponent(() => import('@/components/Order/OrderFormOption'))
const OrderTable = defineAsyncComponent(() => import('@/components/Order/OrderTable'))

const props = defineProps({
  id: String,
  order: Object,
})
const emit = defineEmits(['update:order'])

const orderTable = ref()
const hasOption = computed(
  () =>
    props?.order?.order_type?.def_type === OrderDepType.MAIN.key &&
    OrderStatus.NEW.key === props?.order?.status
)
</script>
