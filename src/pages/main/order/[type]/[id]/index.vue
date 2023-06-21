<template>
  <div>
    <OrderCard
      v-if="order"
      :item="order"
      @update:item="emit('update:order', $event)"
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
          v-if="
            order?.order_type?.def_type === OrderDepType.MAIN.key &&
            OrderStatus.NEW.key === order?.status
          "
          :parent-order="order"
          :customer-id="order?.user_customer"
          @created="orderTable?.refresh()"
        />
      </template>
    </OrderTable>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import OrderCard from '@/components/Order/OrderCard'
import OrderFormOption from '@/components/Order/OrderFormOption'
import OrderTable from '@/components/Order/OrderTable'
import api from '@/api'
import { OrderDepType, OrderStatus } from '@/enums'

defineProps({
  id: String,
  order: Object,
})
const emit = defineEmits(['update:order'])

const orderTable = ref()
</script>
